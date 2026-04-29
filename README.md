# PortfolioWebapp

A personal portfolio site built from scratch and deployed on a fully custom AWS infrastructure. Rather than using a managed hosting service, every layer of the stack is configured and maintained directly.

Live at: [ethannayak.com](https://ethannayak.com)

---

## Overview

This is my personal portfolio site showcasing my projects, skills, and experience as a Computer Science student at Rutgers University. The site itself is intentionally simple on the frontend. The real work is in how it's deployed and kept running.

Rather than reaching for GitHub Pages or Netlify, I used this project as a chance to architect a production-grade AWS environment from scratch, building real hands-on experience with CDN configuration, DNS management, SSL provisioning, and cloud storage.

The site has been live and HTTPS-secured for 18+ months with zero downtime.

---

## Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript
- Fully responsive, optimized across desktop, tablet, and mobile
- Performance-focused with minimal dependencies

**Infrastructure (AWS)**
| Service | Role |
|---|---|
| S3 | Static file storage and hosting origin |
| CloudFront | CDN for global edge caching and HTTPS enforcement |
| Route 53 | DNS management and domain routing |
| ACM (AWS Certificate Manager) | SSL/TLS certificate provisioning and auto-renewal |

---

## Architecture

```
User Request
     │
     ▼
Route 53 (DNS resolution)
     │
     ▼
CloudFront (CDN edge node)
     │
     ├── Cache HIT  →  serves cached response from nearest edge location
     │
     └── Cache MISS →  fetches from S3 origin, caches at edge
                           │
                           ▼
                        S3 Bucket (static files)
```

**Key design decisions:**
- HTTPS is enforced at the CloudFront distribution level. HTTP requests are automatically redirected.
- SSL certificate is managed via ACM and tied to the CloudFront distribution, with automatic renewal so the cert never expires.
- Route 53 uses an alias record pointing to the CloudFront distribution rather than a plain CNAME, which eliminates DNS lookup latency at the root domain.
- CloudFront cache behaviors are configured per path pattern to balance freshness with performance.

---

## What I Learned

This project started as "just deploy a portfolio site" but turned into a real infrastructure lesson. A few things that stuck:

- **Request tracing end to end.** I can now follow a request from DNS lookup to CloudFront edge to S3 origin to response delivery. That mental model transfers directly to understanding how larger systems work.
- **HTTPS is not free setup.** Getting the cert right, attaching it to the distribution, and enforcing redirects required understanding how ACM integrates with CloudFront specifically.
- **CDN caching has real tradeoffs.** A cache TTL that's too aggressive means stale content for users; too short and you lose the latency benefit. I had to think through invalidation strategy when deploying updates.
- **Operational stability.** Keeping something live for 18+ months with no downtime comes down to careful configuration during updates and knowing how to roll back when something breaks.



## Deployment

The site is deployed to S3 and served via CloudFront. The general update flow is:

1. Sync updated static files to the S3 bucket
2. Create a CloudFront cache invalidation so new content is served from the edge immediately rather than waiting for TTL expiry

Skipping the invalidation means users get stale cached content from edge nodes even after the S3 origin has been updated, so both steps are necessary.

---

## Project Structure

```
PortfolioWebapp/
├── index.html          # Home page
├── projects.html       # Projects page
├── contact.html        # Contact page
├── style.css           # Global styles
├── mediaqueries.css    # Responsive/mobile styles
├── script.js           # JS interactions
├── Pictures/           # Images and assets
└── README.md
```

---

## Contact

**Ethan Nayak** | CS @ Rutgers University

Interested in SWE, security, and cloud infrastructure roles.

- GitHub: [github.com/ethan-nayak](https://github.com/ethan-nayak)
- LinkedIn: [linkedin.com/in/ethan-nayak](https://www.linkedin.com/in/ethan-nayak/)
- Email: ethananayak@gmail.com
