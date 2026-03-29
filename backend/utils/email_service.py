import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, HtmlContent


def send_booking_confirmation_email(
    to_email: str,
    customer_name: str,
    booking_id: str,
    hotel_name: str,
    hotel_address: str,
    room_name: str,
    room_type: str,
    check_in: str,
    check_out: str,
    nights: int,
    adults: int,
    children: int,
    total_amount: float,
    payment_method: str = "Online Payment"
):
    """
    Sends a beautifully formatted booking confirmation email via SendGrid.
    Call this function whenever a payment status becomes 'paid'.
    """

    SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
    SENDER_EMAIL     = os.environ.get("SENDER_EMAIL", "no-reply@innova-hms.com")
    SENDER_NAME      = "Innova HMS"

    if not SENDGRID_API_KEY:
        print("❌ SENDGRID_API_KEY not set. Skipping email.")
        return False

    # Format currency
    formatted_total = f"₱{total_amount:,.2f}"
    price_per_night = f"₱{(total_amount / nights):,.2f}" if nights > 0 else "N/A"

    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap');

    * {{ margin: 0; padding: 0; box-sizing: border-box; }}

    body {{
      background-color: #f5f0e8;
      font-family: 'DM Sans', Arial, sans-serif;
      color: #1a1a1a;
      padding: 32px 16px;
    }}

    .wrapper {{
      max-width: 600px;
      margin: 0 auto;
    }}

    /* Header */
    .header {{
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border-radius: 20px 20px 0 0;
      padding: 40px 40px 32px;
      text-align: center;
    }}

    .brand {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: #bf9b30;
      margin-bottom: 8px;
    }}

    .header-title {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 6px;
    }}

    .header-subtitle {{
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      letter-spacing: 1px;
    }}

    /* Gold divider */
    .gold-divider {{
      height: 3px;
      background: linear-gradient(90deg, transparent, #bf9b30, transparent);
      margin: 0;
    }}

    /* Body */
    .body {{
      background: #ffffff;
      padding: 40px;
    }}

    .greeting {{
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }}

    .intro-text {{
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 32px;
    }}

    /* Booking ID badge */
    .booking-badge {{
      display: inline-block;
      background: #f5f0e8;
      border: 1px solid #e8dfc8;
      border-radius: 10px;
      padding: 12px 20px;
      margin-bottom: 28px;
    }}

    .booking-badge-label {{
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #bf9b30;
      margin-bottom: 4px;
    }}

    .booking-badge-id {{
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 2px;
    }}

    /* Section title */
    .section-title {{
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #bf9b30;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f0ebe0;
    }}

    /* Hotel info card */
    .hotel-card {{
      background: #f9f6ef;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 24px;
      border-left: 4px solid #bf9b30;
    }}

    .hotel-name {{
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 4px;
    }}

    .hotel-address {{
      font-size: 13px;
      color: #888;
    }}

    .room-tag {{
      display: inline-block;
      background: #bf9b30;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
      margin-top: 10px;
    }}

    /* Details grid */
    .details-grid {{
      display: table;
      width: 100%;
      margin-bottom: 24px;
    }}

    .detail-row {{
      display: table-row;
    }}

    .detail-cell {{
      display: table-cell;
      padding: 10px 0;
      border-bottom: 1px solid #f0ebe0;
      vertical-align: middle;
    }}

    .detail-label {{
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #aaa;
      width: 45%;
    }}

    .detail-value {{
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      text-align: right;
    }}

    /* Pricing summary */
    .pricing-box {{
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 28px;
    }}

    .pricing-row {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
    }}

    .pricing-label {{
      font-size: 12px;
      color: rgba(255,255,255,0.55);
      letter-spacing: 0.5px;
    }}

    .pricing-value {{
      font-size: 13px;
      font-weight: 600;
      color: rgba(255,255,255,0.85);
    }}

    .pricing-divider {{
      border: none;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 12px 0;
    }}

    .pricing-total-label {{
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
    }}

    .pricing-total-value {{
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      color: #bf9b30;
    }}

    /* Payment confirmed badge */
    .paid-badge {{
      text-align: center;
      margin-bottom: 28px;
    }}

    .paid-badge-inner {{
      display: inline-block;
      background: #ecfdf5;
      border: 1.5px solid #6ee7b7;
      border-radius: 50px;
      padding: 10px 24px;
    }}

    .paid-badge-text {{
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #059669;
    }}

    /* Important notes */
    .notes-box {{
      background: #fffbf0;
      border: 1px solid #f0dea0;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 28px;
    }}

    .notes-title {{
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #c97d10;
      margin-bottom: 10px;
    }}

    .notes-item {{
      font-size: 13px;
      color: #555;
      line-height: 1.6;
      padding-left: 14px;
      position: relative;
      margin-bottom: 4px;
    }}

    .notes-item::before {{
      content: '•';
      position: absolute;
      left: 0;
      color: #bf9b30;
      font-weight: 700;
    }}

    /* Footer */
    .footer {{
      background: #f5f0e8;
      border-radius: 0 0 20px 20px;
      padding: 28px 40px;
      text-align: center;
      border-top: 1px solid #e8dfc8;
    }}

    .footer-brand {{
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }}

    .footer-text {{
      font-size: 12px;
      color: #aaa;
      line-height: 1.6;
      margin-bottom: 12px;
    }}

    .footer-legal {{
      font-size: 11px;
      color: #ccc;
    }}
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <p class="brand">✦ &nbsp; Innova HMS &nbsp; ✦</p>
      <h1 class="header-title">Booking Confirmed</h1>
      <p class="header-subtitle">Your reservation is all set</p>
    </div>

    <div class="gold-divider"></div>

    <!-- Body -->
    <div class="body">

      <p class="greeting">Hello, {customer_name}! 👋</p>
      <p class="intro-text">
        Thank you for choosing <strong>Innova HMS</strong>. Your payment has been successfully received and your booking is now confirmed. We look forward to welcoming you!
      </p>

      <!-- Booking ID -->
      <div class="booking-badge">
        <p class="booking-badge-label">Booking Reference</p>
        <p class="booking-badge-id">#{booking_id.upper()}</p>
      </div>

      <!-- Payment Confirmed -->
      <div class="paid-badge">
        <div class="paid-badge-inner">
          <span class="paid-badge-text">✓ &nbsp; Payment Confirmed</span>
        </div>
      </div>

      <!-- Hotel & Room -->
      <p class="section-title">Your Accommodation</p>
      <div class="hotel-card">
        <p class="hotel-name">{room_name}</p>
        <p class="hotel-address">📍 {hotel_address}</p>
        <span class="room-tag">{room_type}</span>
        <p style="margin-top: 8px; font-size: 15px; font-weight: 600; color: #333;">{hotel_name}</p>
      </div>

      <!-- Stay Details -->
      <p class="section-title">Stay Details</p>
      <div class="details-grid">
        <div class="detail-row">
          <div class="detail-cell detail-label">Check-in</div>
          <div class="detail-cell detail-value">{check_in}</div>
        </div>
        <div class="detail-row">
          <div class="detail-cell detail-label">Check-out</div>
          <div class="detail-cell detail-value">{check_out}</div>
        </div>
        <div class="detail-row">
          <div class="detail-cell detail-label">Duration</div>
          <div class="detail-cell detail-value">{nights} Night{'s' if nights != 1 else ''}</div>
        </div>
        <div class="detail-row">
          <div class="detail-cell detail-label">Guests</div>
          <div class="detail-cell detail-value">{adults} Adult{'s' if adults != 1 else ''}{f', {children} Child' + ('ren' if children > 1 else '') if children > 0 else ''}</div>
        </div>
        <div class="detail-row">
          <div class="detail-cell detail-label">Payment Method</div>
          <div class="detail-cell detail-value">{payment_method}</div>
        </div>
      </div>

      <!-- Pricing Summary -->
      <p class="section-title">Payment Summary</p>
      <div class="pricing-box">
        <div class="pricing-row">
          <span class="pricing-label">Rate per night</span>
          <span class="pricing-value">{price_per_night}</span>
        </div>
        <div class="pricing-row">
          <span class="pricing-label">Number of nights</span>
          <span class="pricing-value">× {nights}</span>
        </div>
        <hr class="pricing-divider"/>
        <div class="pricing-row">
          <span class="pricing-total-label">Total Paid</span>
          <span class="pricing-total-value">{formatted_total}</span>
        </div>
      </div>

      <!-- Important Notes -->
      <div class="notes-box">
        <p class="notes-title">⚠ Important Reminders</p>
        <p class="notes-item">Please present this email or your Booking ID at check-in.</p>
        <p class="notes-item">Check-in is typically at 2:00 PM and check-out at 12:00 PM noon.</p>
        <p class="notes-item">For changes or cancellations, contact the hotel directly.</p>
        <p class="notes-item">A valid government-issued ID is required upon check-in.</p>
      </div>

    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-brand">INNOVA HMS</p>
      <p class="footer-text">
        Questions? Visit your bookings page or reach out to the hotel directly.<br/>
        We hope you have a wonderful stay!
      </p>
      <p class="footer-legal">© 2026 Innova Hotel Management System. All rights reserved.</p>
    </div>

  </div>
</body>
</html>
"""

    message = Mail(
        from_email=(SENDER_EMAIL, SENDER_NAME),
        to_emails=to_email,
        subject=f"✅ Booking Confirmed — {hotel_name} | Ref #{booking_id.upper()}",
        html_content=HtmlContent(html_content)
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"✅ Confirmation email sent to {to_email} | Status: {response.status_code}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False