# API Testing Guide

## Prasyarat
- Server sudah berjalan: `npm run dev`
- MongoDB sudah connect
- Port: `http://localhost:3000`

---

## Opsi 1: Menggunakan Shell Script

### 1. Buat file executable
```bash
chmod +x test-api.sh
```

### 2. Jalankan semua test sekaligus
```bash
./test-api.sh
```

Atau dari terminal VS Code:
```bash
bash test-api.sh
```

Script ini akan test 6 endpoint:
- ✅ POST /tasks (Create Task - High Priority)
- ✅ POST /tasks (Create Task - Medium Priority)
- ✅ GET /tasks (Get All Tasks)
- ✅ POST /finance (Create Income)
- ✅ POST /finance (Create Expense)
- ✅ GET /finance (Get All Finance)

---

## Opsi 2: Menggunakan Postman

### 1. Import Collection
- Buka Postman
- Klik "Import"
- Pilih file `postman-collection.json`

### 2. Test Setiap Endpoint
Collection sudah siap dengan request untuk:

#### Tasks
- `POST /tasks` - Create Task
- `GET /tasks` - Get All Tasks
- `POST /tasks/schedule` - Get Schedule Recommendation
- `DELETE /tasks/{id}` - Delete Task

#### Finance
- `POST /finance` - Create Income/Expense
- `GET /finance` - Get All Finance

---

## Opsi 3: Manual Testing dengan CURL

### Create a Task
```bash
curl -X POST "http://localhost:3000/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete Project",
    "deadline": "2026-05-15T18:00:00Z",
    "priority": "high",
    "status": "pending"
  }'
```

### Get All Tasks
```bash
curl -X GET "http://localhost:3000/tasks"
```

### Get Schedule Recommendation
```bash
curl -X POST "http://localhost:3000/tasks/schedule" \
  -H "Content-Type: application/json" \
  -d '{
    "deadline": "2026-05-15T18:00:00Z",
    "priority": "high"
  }'
```

### Create Finance (Income)
```bash
curl -X POST "http://localhost:3000/finance" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "income",
    "amount": 5000000,
    "category": "Gaji",
    "date": "2026-05-09T00:00:00Z"
  }'
```

### Create Finance (Expense)
```bash
curl -X POST "http://localhost:3000/finance" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 500000,
    "category": "Makan",
    "date": "2026-05-09T00:00:00Z"
  }'
```

### Get All Finance
```bash
curl -X GET "http://localhost:3000/finance"
```

### Delete Task
```bash
curl -X DELETE "http://localhost:3000/tasks/{TASK_ID}"
```

---

## Expected Response Format

### Success (201 Created)
```json
{
  "_id": "...",
  "title": "Complete Project",
  "deadline": "2026-05-15T18:00:00Z",
  "priority": "high",
  "status": "pending",
  "createdAt": "2026-05-09T...",
  "updatedAt": "2026-05-09T..."
}
```

### Success (200 OK)
```json
[
  {
    "_id": "...",
    "title": "...",
    ...
  }
]
```

### Error Response
```json
{
  "message": "Error description"
}
```

---

## Testing Checklist

### Tasks API
- [ ] POST /tasks berhasil membuat task
- [ ] GET /tasks menampilkan semua task
- [ ] POST /tasks/schedule memberikan rekomendasi jadwal
- [ ] DELETE /tasks/{id} menghapus task

### Finance API
- [ ] POST /finance berhasil membuat income
- [ ] POST /finance berhasil membuat expense
- [ ] GET /finance menampilkan semua transaksi

---

## Troubleshooting

### Error: "Connection refused"
- Pastikan server berjalan: `npm run dev`
- Periksa MongoDB sudah connect

### Error: "Invalid date"
- Gunakan format ISO 8601: `YYYY-MM-DDTHH:mm:ssZ`

### Error: "Priority must be one of low, medium, or high"
- Gunakan priority yang benar: `low`, `medium`, atau `high`

### Error: "Type must be income or expense"
- Gunakan type yang benar: `income` atau `expense`
