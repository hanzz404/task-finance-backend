const PRIORITY_CONFIG = {
  high: { order: 1, durationHours: 1 },
  medium: { order: 2, durationHours: 2 },
  low: { order: 3, durationHours: 3 },
};

function normalizeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date value');
  }
  return date;
}

function roundToNextHalfHour(date) {
  const next = new Date(date);
  next.setMinutes(next.getMinutes() + (30 - (next.getMinutes() % 30)) % 30, 0, 0);
  return next;
}

function addHours(date, hours) {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

function formatDate(date) {
  return date.toISOString();
}

function buildSchedule(tasks) {
  const now = roundToNextHalfHour(new Date());
  let currentStart = new Date(now);

  return tasks.map((task) => {
    const config = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
    const durationHours = task.durationHours || config.durationHours;
    const scheduledStart = new Date(currentStart);
    const scheduledEnd = addHours(scheduledStart, durationHours);
    const deadline = normalizeDate(task.deadline);

    const isLate = scheduledEnd > deadline;
    currentStart = new Date(scheduledEnd);

    return {
      ...task,
      scheduledStart,
      scheduledEnd,
      durationHours,
      isLate,
    };
  });
}

function suggestScheduleForTask({ deadline, priority }, existingTasks = []) {
  if (!deadline) {
    throw new Error('Deadline is required for scheduling');
  }

  const normalizedDeadline = normalizeDate(deadline);
  const taskPriority = priority || 'medium';

  if (!PRIORITY_CONFIG[taskPriority]) {
    throw new Error('Priority must be one of low, medium, or high');
  }

  const newTask = {
    id: 'recommendation',
    deadline: normalizedDeadline,
    priority: taskPriority,
    durationHours: PRIORITY_CONFIG[taskPriority].durationHours,
  };

  const scheduledTasks = existingTasks
    .map((task) => ({
      id: task.id || task._id,
      deadline: task.deadline,
      priority: task.priority,
      durationHours: PRIORITY_CONFIG[task.priority]?.durationHours || PRIORITY_CONFIG.medium.durationHours,
    }))
    .concat(newTask)
    .sort((a, b) => {
      const priorityDiff = PRIORITY_CONFIG[a.priority].order - PRIORITY_CONFIG[b.priority].order;
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.deadline) - new Date(b.deadline);
    });

  const schedule = buildSchedule(scheduledTasks);
  const recommendation = schedule.find((entry) => entry.id === newTask.id);

  return {
    recommendation: {
      deadline: formatDate(recommendation.deadline),
      priority: recommendation.priority,
      durationHours: recommendation.durationHours,
      scheduledStart: formatDate(recommendation.scheduledStart),
      scheduledEnd: formatDate(recommendation.scheduledEnd),
      onTime: !recommendation.isLate,
    },
    schedule: schedule.map((entry) => ({
      id: entry.id,
      deadline: formatDate(entry.deadline),
      priority: entry.priority,
      durationHours: entry.durationHours,
      scheduledStart: formatDate(entry.scheduledStart),
      scheduledEnd: formatDate(entry.scheduledEnd),
      isLate: entry.isLate,
    })),
  };
}

module.exports = { suggestScheduleForTask };
