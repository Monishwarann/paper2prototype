import sys
import os

# Add monorepo paths to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(__file__)), "apps", "backend"))

from apps.backend.app.main import app

# Vercel serverless function entry point
handler = app
