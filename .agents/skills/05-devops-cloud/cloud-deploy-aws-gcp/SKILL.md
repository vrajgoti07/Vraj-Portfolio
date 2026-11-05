---
name: cloud-deploy-aws-gcp
description: Deploy and operate apps on cloud platforms (AWS, GCP, Azure, Vercel, Railway, Render, Cloud Run) with IaC, networking, secrets, monitoring and cost control. Use this skill whenever the user asks how to host, deploy, scale, or put an app in production.
---

# Cloud Deployment

## Choose a platform
| Need | Option |
|---|---|
| Next.js/static frontend | Vercel / Netlify / Cloudflare Pages |
| Simple full-stack, fast start | Railway / Render / Fly.io |
| Containers, scale-to-zero | **Cloud Run** / AWS App Runner / Azure Container Apps |
| Full control | AWS ECS Fargate / EKS / GKE |
| Mobile backend | Firebase / Supabase |

## Production checklist
- [ ] IaC (Terraform/Pulumi/CDK) — no click-ops  - [ ] Separate dev/stage/prod accounts
- [ ] Managed DB with backups + PITR + private networking  - [ ] HTTPS/TLS + custom domain + CDN
- [ ] Secrets manager (not env files in git)  - [ ] Least-privilege IAM, no root keys
- [ ] Autoscaling + health checks  - [ ] Logs, metrics, traces, alerts (on-call actionable)
- [ ] Budgets + alerts on spend  - [ ] Disaster recovery & restore drill

## Observability
Structured logs → central store; RED metrics (Rate, Errors, Duration); distributed tracing (OpenTelemetry); uptime checks; error tracking (Sentry). Define SLOs.

## Cost control
Right-size, use autoscaling to zero for non-prod, reserved/savings plans for steady load, lifecycle policies on storage, tag everything.
