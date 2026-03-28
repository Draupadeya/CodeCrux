# CodeCrux - Render Deployment Guide

## 📋 Pre-Deployment Checklist

- ✅ Code committed to GitHub
- ✅ `.env` file configured (not in git)
- ✅ Database ready
- ✅ Static files configured
- ✅ Requirements.txt finalized
- ✅ Procfile configured for gunicorn
- ✅ Dockerfile ready

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare GitHub Repository

1. Make sure all code is pushed to GitHub (main branch)
   ```bash
   git push origin master:main
   ```

2. Verify your repository is public and accessible:
   - Go to: https://github.com/Draupadeya/CodeCrux
   - Check Settings > Visibility is "Public"

---

### Step 2: Create Render Account

1. Visit **[render.com](https://render.com)** and sign up
2. Connect your GitHub account:
   - Click "Connect GitHub"
   - Authorize Render to access your repositories
   - Select "Draupadeya/CodeCrux"

---

### Step 3: Create Web Service

1. **Click "New +" → Select "Web Service"**

2. **Connect Repository:**
   - Repository: `Draupadeya/CodeCrux`
   - Branch: `main`

3. **Basic Settings:**
   - **Name:** `codecrux` (or your choice)
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `cd proctoring && gunicorn proctoring.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120`

4. **Region:** Choose closest to your users
   - Example: Singapore (Southeast Asia), US (Ohio), etc.

5. **Instance Type:** 
   - **Free** for testing
   - **Paid** (if free tier quota exceeded)

---

### Step 4: Configure Environment Variables

In the Render dashboard, go to **Environment**:

```env
# Django Settings
DJANGO_SETTINGS_MODULE=proctoring.settings
DEBUG=False
PYTHON_VERSION=3.11.9

# Secret Key (generate a new one!)
SECRET_KEY=your-new-secret-key-here

# Allowed Hosts
ALLOWED_HOSTS=codecrux.onrender.com,localhost

# Database (if using PostgreSQL on Render)
DATABASE_URL=postgresql://user:password@hostname:5432/database_name

# Optional: AI Services
GEMINI_API_KEY=your-google-genai-key-here

# Optional: External Services
YOUTUBE_API_KEY=your-youtube-key-here
```

### ⚠️ Generate a New SECRET_KEY

```python
# In Python terminal:
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

Copy the output and paste into `SECRET_KEY` environment variable.

---

### Step 5: Configure Database (Optional)

**Option A: Use PostgreSQL on Render**
1. Create a PostgreSQL database on Render
2. Copy connection string
3. Add as `DATABASE_URL` environment variable

**Option B: Use External PostgreSQL**
1. Use existing PostgreSQL database
2. Add connection string as `DATABASE_URL`

**Option C: Use SQLite (Not Recommended for Production)**
- Default SQLite will work but data resets on deployments

---

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies
   - Run build command
   - Start your application
3. Wait for deployment (2-5 minutes)

---

### Step 7: Verify Deployment

Once deployed:

1. ✅ Check your live URL: `https://codecrux.onrender.com`
2. ✅ Test login page loads
3. ✅ Check Django admin: `/admin/`
4. ✅ View logs if issues occur

---

## 🔧 Post-Deployment Setup

### Run Django Migrations (if not auto-run)

In Render dashboard:
1. Go to **Shell**
2. Run:
   ```bash
   cd proctoring
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py collectstatic --noinput
   ```

### Create Admin User

```bash
python manage.py createsuperuser
# Follow prompts to create admin account
```

---

## 🐛 Troubleshooting

### Issue: Build Failed
**Error:** "Could not find requirements.txt"
- **Solution:** Ensure requirements.txt is in repository root
- **Check:** `git log --all -- requirements.txt`

### Issue: Module Not Found
**Error:** "ModuleNotFoundError: No module named 'xyz'"
- **Solution:** Add missing package to requirements.txt
- **Action:** 
  ```bash
  pip install xyz
  pip freeze > requirements.txt
  git push
  ```

### Issue: Database Connection Error
**Error:** "psycopg2.OperationalError"
- **Solution:** Check DATABASE_URL environment variable
- **Verify:** 
  ```bash
  echo $DATABASE_URL
  ```

### Issue: Static Files Not Loading
**Error:** 404 on CSS/JS files
- **Solution:** Run collectstatic in Shell
- **Command:**
  ```bash
  cd proctoring
  python manage.py collectstatic --clear --noinput
  ```

### Issue: Port Already in Use
**Error:** "Address already in use"
- **Solution:** Automatic, Render assigns correct $PORT
- **Check:** Start command uses `$PORT` variable

### View Deployment Logs

In Render dashboard:
1. Go to **Logs** tab
2. View real-time deployment and application logs
3. Copy entire log for debugging

---

## 📊 Monitoring & Maintenance

### Check Application Health

```bash
# In Render Shell
python manage.py check
```

### View Database Status

```bash
python manage.py dbshell
# Then: SELECT version();
```

### Update Application

1. Make code changes locally
2. `git push` to main branch
3. Render auto-redeploys

### Update Dependencies

```bash
pip install --upgrade package-name
pip freeze > requirements.txt
git push
```

---

## 🔐 Security Best Practices

1. ✅ **Set DEBUG=False** in production
2. ✅ **Use environment variables** for secrets
3. ✅ **Generate new SECRET_KEY** for production
4. ✅ **Enable HTTPS** (Render does this automatically)
5. ✅ **Restrict ALLOWED_HOSTS** to your domain
6. ✅ **Use strong database passwords**
7. ✅ **Rotate API keys** regularly
8. ✅ **monitor logs** for suspicious activity

---

## 🚀 Auto-Deployment

Render automatically redeploys when:
- You push to the connected branch (main)
- Configuration changes in dashboard
- Environment variables update

**Disable Auto-Deploy** (if needed):
- Settings → Auto-Deploy → Toggle Off

---

## 📈 Performance Optimization

### Increase Workers (if needed)

In Start Command:
```bash
gunicorn proctoring.wsgi:application --bind 0.0.0.0:$PORT --workers 4 --timeout 120
```

### Database Optimization

```bash
# In Django Shell
python manage.py dbshell
CREATE INDEX idx_student_id ON monitor_session(student_id);
```

### Caching

Configure Redis (if needed):
- Add Redis database on Render
- Update settings.py with Redis URL

---

## 💰 Render Pricing

| Feature | Free | Paid |
|---------|------|------|
| Web Services | 0.5 CPU, 512MB RAM | 1+ CPU, 2GB+ RAM |
| Auto-suspend | Yes (after 15 min inactivity) | No |
| PostgreSQL | 256MB | 4GB+ |
| Monthly | $0 | $7/month+ |

---

## 🆘 Getting Help

**Render Support:**
- Dashboard: Help icon → Contact Support
- Email: support@render.com
- Docs: https://render.com/docs

**Project Issues:**
- Check logs in Render dashboard
- Review Django debug output
- Test locally before pushing

---

## ✅ Deployment Checklist

- [ ] Repository is public on GitHub
- [ ] All code committed and pushed
- [ ] requirements.txt is complete
- [ ] Procfile is configured
- [ ] Dockerfile is ready (if using Docker)
- [ ] runtime.txt specifies Python 3.11
- [ ] Environment variables set in Render
- [ ] Database configured (if needed)
- [ ] DEBUG=False in production
- [ ] ALLOWED_HOSTS updated
- [ ] SECRET_KEY changed for production
- [ ] Tested locally before deploying
- [ ] Deployment successful
- [ ] Admin user created
- [ ] Application is accessible

---

## 🎉 Success!

Once deployed, your CodeCrux application is:
- ✅ Live on the internet
- ✅ Auto-deployed on code push
- ✅ Backed by PostgreSQL
- ✅ Running with gunicorn
- ✅ Protected with HTTPS

Your site is at: **https://codecrux.onrender.com**

---

**For more help, see:**
- [Render Documentation](https://render.com/docs)
- [Django Deployment Guide](https://docs.djangoproject.com/en/4.2/howto/deployment/)
- [Gunicorn Docs](https://docs.gunicorn.org/)
