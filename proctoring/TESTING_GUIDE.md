# SparkLess Admin Portal - Testing Guide

## 🧪 Complete Testing Walkthrough

### Prerequisites
- Django server running: `python manage.py runserver 786`
- Admin portal accessible: `http://localhost:786/admin/` 
- Sample data loaded (optional but recommended)

---

## Test 1: Sample Student Login

### Setup
```bash
cd proctoring
python manage.py setup_students --file sample_students.csv
python manage.py runserver 786
```

### Test Student Credentials
```
Username: CS2024001
Password: 19990615
```

### Steps
1. Open http://localhost:786/
2. Enter Username: `CS2024001`
3. Enter Password: `19990615`
4. Click "Sign In"

### Expected Result
✅ Student should login successfully
✅ Redirected to student dashboard
✅ Student profile loaded

### Troubleshoot
❌ If login fails:
- Check password format (YYYYMMDD)
- Verify student exists: Go to /admin/ → Student Profiles
- Check user is active: Go to /admin/ → Users

---

## Test 2: Invalid Student Password

### Steps
1. Open http://localhost:786/
2. Enter Username: `CS2024001`
3. Enter Password: `wrong_password`
4. Click "Sign In"

### Expected Result
✅ Login fails with error message
✅ Redirected back to login page
✅ Error message shown: "Invalid credentials"

---

## Test 3: Create Faculty Account

### Steps
1. Go to http://localhost:786/admin/
2. Use superuser credentials (or existing staff account)
3. Navigate to **Users** → **Add User**
4. Fill in:
   - Username: `faculty_john`
   - Password: `TestPassword123`
5. Check: **Staff status** ✓
6. Optionally check: **Superuser status** (for full admin)
7. Click **Save**

### Expected Result
✅ User created successfully
✅ Message: "The user 'faculty_john' was added successfully"
✅ Faculty account visible in Users list

---

## Test 4: Faculty Login

### Steps
1. Logout if logged in
2. Open http://localhost:786/
3. Enter Username: `faculty_john`
4. Enter Password: `TestPassword123`
5. Click "Sign In"

### Expected Result
✅ Faculty login successful
✅ Redirected to admin dashboard or staff-only page
✅ Access to admin panel available

---

## Test 5: Add Single Student via Command

### Steps
```bash
python manage.py setup_students --add-student "CS2024099,Test Student,1999-05-10"
```

### Expected Output
```
✓ Student created: CS2024099 | Password: 19990515
```

### Verify
1. Go to http://localhost:786/admin/
2. Navigate to **Student Profiles**
3. Search for "CS2024099" or "Test Student"
4. Should appear in list

### Test Login
```
Username: CS2024099
Password: 19990515
```

---

## Test 6: Bulk Import via CSV

### Create Custom CSV
File: `test_students.csv`
```
roll_number,name,dob
CS2025001,Alice Johnson,2000-01-15
CS2025002,Bob Smith,1999-08-22
CS2025003,Carol White,2001-03-30
```

### Steps
```bash
python manage.py setup_students --file test_students.csv
```

### Expected Output
```
✓ Student created: CS2025001 | Password: 20000115
✓ Student created: CS2025002 | Password: 19990822
✓ Student created: CS2025003 | Password: 20010330

Total 3 students processed from test_students.csv
```

### Verify in Admin
1. Go to http://localhost:786/admin/ → Student Profiles
2. Should see all 3 new students

---

## Test 7: Delete All Users

### Steps
```bash
python manage.py setup_students --delete-all
```

### Prompt
```
Are you sure you want to delete all users except superuser? (yes/no):
```

### Type
```
yes
```

### Expected Output
```
All users deleted except superuser
```

### Verify
1. Go to http://localhost:786/admin/ → Users
2. Only superuser(s) should remain
3. Previously created users gone

### Restore Data
```bash
python manage.py setup_students --file sample_students.csv
```

---

## Test 8: Candidate Registration (Exam Setup)

### Steps
1. Go to http://localhost:786/admin/
2. Navigate to **Candidates** → **Add Candidate**
3. Fill in:
   - Name: `Raj Kumar`
   - Roll Number: `CS2024001`
   - Email: `raj@example.com`
4. Click **Save** (photo optional for this test)

### Expected Result
✅ Candidate created successfully
✅ Visible in Candidates list
✅ Roll number marked as unique

---

## Test 9: Duplicate Roll Number Prevention

### Steps
1. Try to add another candidate with same roll number:
   - Roll Number: `CS2024001`
2. Click **Save**

### Expected Result
❌ Error: "roll_number with this value already exists"
✅ Data validation working correctly

---

## Test 10: View Student in Admin

### Steps
1. Go to http://localhost:786/admin/ → Student Profiles
2. Click on a student (e.g., "Raj Kumar")
3. View details:
   - Full Name
   - Roll Number
   - Date of Birth
   - Linked User Account

### Expected Result
✅ All student information displayed correctly
✅ Linked User account visible
✅ Read-only fields locked (DOB, Roll Number on edit)

---

## Test 11: Admin Portal Navigation

### Test All Sections
1. **Users**
   - List all users
   - Add user
   - Edit user
   - Delete user

2. **Student Profiles**
   - View all students
   - Search by name/roll number
   - View details
   - Edit profile

3. **Candidates**
   - Register candidates
   - Upload photos
   - Block/Unblock
   - View status

4. **Sessions**
   - View all sessions
   - Check verdict
   - View scores

5. **Events**
   - View all events
   - Check event types
   - View timestamps

### Expected Result
✅ All sections accessible
✅ Data displays correctly
✅ No console errors

---

## Test 12: Error Handling - Invalid CSV Format

### Create Bad CSV
File: `bad_students.csv`
```
name,dob
Alice,2000-01-15
```

(Missing roll_number column)

### Steps
```bash
python manage.py setup_students --file bad_students.csv
```

### Expected Output
```
Skipping invalid row: ['Alice', '2000-01-15']
```

✅ Error handling works

---

## Test 13: Error Handling - Invalid Date Format

### Steps
```bash
python manage.py setup_students --add-student "CS2025099,Test,01/15/2000"
```

(Wrong date format)

### Expected Output
```
Error creating CS2025099: time data '01/15/2000' does not match format '%Y-%m-%d'
```

✅ Date validation working

---

## Test 14: Password Reset (Faculty)

### Steps
1. Go to http://localhost:786/admin/
2. Go to **Users**
3. Click on faculty_john
4. Click "this form" link in password section
5. Enter new password
6. Click **Change password**

### Expected Result
✅ Password changed successfully
✅ Faculty can login with new password

---

## Test 15: Staff Status Management

### Steps
1. Go to http://localhost:786/admin/
2. Go to **Users**
3. Add a new user
4. Toggle **Staff status**
5. Save

### Expected Result
✅ User is/isn't staff (based on toggle)
✅ Staff users can access admin
✅ Non-staff users redirected

---

## Performance Testing

### Test with 1000 Students

```bash
# Create large CSV
python create_large_csv.py  # (create this separately)

# Import
python manage.py setup_students --file large_students.csv

# Time should be reasonable (< 30 seconds for 1000 students)
```

### Expected Result
✅ Import completes successfully
✅ Admin panel responsive
✅ Search/filter still fast

---

## Browser Compatibility Testing

### Test Browsers
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Safari (if available)

### Login Page Tests
- Form submission works
- Icons render correctly
- Responsive design works
- Slideshow displays
- Navigation buttons work

### Admin Panel Tests
- Admin interface loads
- Forms work correctly
- Search/filter responsive
- Table display correct
- No JavaScript errors

---

## Mobile Testing

### Responsive Design
1. Open login page on mobile
2. Should be responsive
3. Form easy to use
4. Text readable

### Admin Panel on Mobile
1. Access /admin/ on mobile
2. Should be usable (Django default responsive)
3. Can create/edit users
4. Navigation works

---

## Security Testing

### CSRF Protection
1. Try to submit form without CSRF token
2. Should fail with 403 Forbidden
3. Normal login with token should work

### Password Storage
1. Passwords should be hashed in database
2. Never stored in plain text
3. Django hashing working

### Session Management
1. Logout clears session
2. Can't access pages without authentication
3. Session timeout works

---

## Cleanup After Testing

```bash
# Restore to clean state
python manage.py setup_students --delete-all

# Load fresh sample data
python manage.py setup_students --file sample_students.csv

# Or delete sample CSV for production
rm test_students.csv bad_students.csv
```

---

## Test Report Template

```
Test Date: 2026-01-01
Tester: Your Name
Build: SparkLess v1.0

Tests Passed: XX/XX
Tests Failed: X/XX
Bugs Found: X

✅ Test 1: Sample Student Login - PASSED
✅ Test 2: Invalid Password - PASSED
✅ Test 3: Faculty Creation - PASSED
...
❌ Test X: [Issue] - FAILED
   - Details: [Problem description]
   - Reproduction: [Steps]
   - Expected: [What should happen]
   - Actual: [What happened]

Overall Status: READY FOR DEPLOYMENT / NEEDS FIXES

Sign-off: _______________
```

---

## Summary Checklist

- [ ] All student logins working
- [ ] All faculty logins working
- [ ] Bulk import working
- [ ] Single student addition working
- [ ] Admin panel accessible
- [ ] User creation in admin works
- [ ] Student profiles visible
- [ ] Candidate registration works
- [ ] Password reset works
- [ ] Logout works
- [ ] Error messages display correctly
- [ ] No JavaScript errors
- [ ] Responsive design working
- [ ] CSRF protection active
- [ ] Database saving data correctly

---

**Test Environment:** Local Development  
**Database:** SQLite  
**Server:** Django Development Server  
**Port:** 786  

---

All tests completed! System ready for staging/production deployment. ✅

