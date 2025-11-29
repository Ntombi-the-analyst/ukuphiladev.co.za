# Ukuphila KwakaNdengezi Development Website

A Christ-centered NPO website dedicated to empowering youth and women in Kwa-Ndengezi through education, spiritual growth, and sustainable income projects.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dynamic Navigation**: Smooth scrolling between sections
- **Interactive Sliders**: Testimonials and statistics showcases
- **Email Integration**: Contact form with SMTP (FormSubmit) for direct email submissions
- **Mini Stats Slideshows**: Animated statistics showing years of service, lives impacted, and programs
- **Modern UI**: Beautiful gradients, shadows, and animations

## File Structure

```
├── index.html       # Main HTML structure
├── styles.css       # All styling and responsive design
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## Setup Instructions

### 1. Email Configuration (SMTP)

The contact form uses [FormSubmit](https://formsubmit.co/) to send emails via SMTP directly from the browser without a backend server. **No configuration needed!** The form is already set up to send emails to `infor@ukuphiladev.co.za`.

**How it works:**
- FormSubmit is a free service that uses SMTP to send emails
- The form automatically sends emails to the configured address
- No account signup or API keys required
- Free tier allows unlimited submissions

**Email Format:**
When someone submits the contact form, you'll receive an email with:
- **Subject:** New Contact Form Submission: [Enquiry Type]
- **Body:** Includes name, email, phone, enquiry type, and message

**Note:** If you want to customize the email format or add spam protection, you can:
1. Visit [FormSubmit.co](https://formsubmit.co/)
2. Add your email to get a unique endpoint (optional)
3. Update the endpoint in `script.js` if needed (currently set to `infor@ukuphiladev.co.za`)

### 2. Running the Website

Simply open `index.html` in a web browser. No server required!

For development, you can use:
- **VS Code Live Server**: Right-click on `index.html` and select "Open with Live Server"
- **Python**: `python -m http.server 8000` then open `http://localhost:8000`
- **Node.js**: `npx http-server` then open the provided URL

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --teal: #0F8C8C;          /* Primary color */
    --deep-teal: #0A5C5C;     /* Dark accent */
    --gold: #F3A623;          /* Highlight color */
    --light-gold: #FFD47A;    /* Light accent */
    --soft-mint: #E5F7F4;     /* Background */
}
```

### Updating Content

All content is in `index.html`. Each section has clear HTML structure with comments for easy editing.

### Adding Images

Replace the placeholder image references:
- `ukuphila Kwakandengezi development logo.jpg` - Organization logo
- `team.jpg` - Team/community photo
- `pastor.jpg` - Pastor Lamula photo
- `lady_pastor.jpg` - Lady Pastor Lamula photo

## Contact Information

**Location:** Kwa-Ndengezi, KwaZulu-Natal, South Africa  
**Phone/WhatsApp:** +27 78 916 8359  
**Email:** infor@ukuphiladev.co.za | admin@ukuphiladev.co.za

## License

© 2022 Ukuphila KwakaNdengezi Development. All rights reserved.

