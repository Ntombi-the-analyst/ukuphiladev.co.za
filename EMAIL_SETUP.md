# Email Setup Guide

## Current Setup: FormSubmit (No SMTP Credentials Needed)

Your contact form is currently configured to use **FormSubmit**, a free service that handles SMTP for you. **No SMTP username or password is required!**

### How It Works:
- FormSubmit receives form submissions via their API
- They handle the SMTP connection and send emails to your address
- No backend server needed
- No credentials to store

### ⚠️ IMPORTANT: Email Verification Required

**First-time setup:** When you first use FormSubmit with `infor@ukuphiladev.co.za`, you MUST:

1. **Submit a test form** from your website
2. **Check the inbox** for `infor@ukuphiladev.co.za`
3. **Click the verification link** in the email from FormSubmit
4. **After verification**, all future form submissions will be delivered

**If emails aren't arriving:** Check the spam folder and verify the email address!

---

## Alternative: Use Your Own SMTP Server

If you want to use your own SMTP server (Gmail, Outlook, custom server), you'll need:

### Required Information:
- **SMTP Server:** (e.g., `smtp.gmail.com`, `smtp.office365.com`, or your custom server)
- **SMTP Port:** (usually 587 for TLS or 465 for SSL)
- **SMTP Username:** Your email address
- **SMTP Password:** Your email password or app-specific password
- **Backend Server:** Required (Node.js, PHP, Python, etc.) - **Cannot be done in frontend JavaScript alone**

### Why You Need a Backend:
- SMTP credentials must be kept secret (server-side only)
- Frontend JavaScript is visible to anyone and cannot securely store passwords
- A backend server acts as a secure intermediary

### Example Backend Options:

#### Option 1: Node.js with Nodemailer
```javascript
// server.js (requires Node.js)
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, phone, enquiry, message } = req.body;
    
    try {
        await transporter.sendMail({
            from: email,
            to: 'infor@ukuphiladev.co.za',
            subject: `New Contact Form: ${enquiry}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Enquiry:</strong> ${enquiry}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);
```

#### Option 2: PHP with PHPMailer
```php
<?php
// send-email.php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom($_POST['email'], $_POST['name']);
$mail->addAddress('infor@ukuphiladev.co.za');
$mail->Subject = 'New Contact Form: ' . $_POST['enquiry'];
$mail->Body = "Name: {$_POST['name']}\nEmail: {$_POST['email']}\nPhone: {$_POST['phone']}\nMessage: {$_POST['message']}";

$mail->send();
?>
```

---

## Recommended: Stick with FormSubmit

**For your use case, FormSubmit is the best option because:**
- ✅ No backend server needed
- ✅ No SMTP credentials to manage
- ✅ Free and reliable
- ✅ Already configured in your code
- ✅ Works with static hosting (GitHub Pages, Netlify, etc.)

**Just make sure to verify the email address!**

---

## Troubleshooting

### Emails not arriving?
1. Check spam/junk folder
2. Verify email address is correct: `infor@ukuphiladev.co.za`
3. Submit a test form and check for verification email
4. Check browser console for errors (F12 → Console tab)

### Want to change the recipient email?
Update line 270 in `script.js`:
```javascript
formDataToSend.append('_to', 'your-new-email@example.com');
```

And update line 275:
```javascript
fetch('https://formsubmit.co/ajax/your-new-email@example.com', {
```

