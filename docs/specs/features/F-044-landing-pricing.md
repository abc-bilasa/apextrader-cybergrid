# F-044 — Landing page & subscription tiers

```yaml
id: F-044
status: done
depends: [F-008]
estimate: 60m
```

## Outcome

Public marketing landing for logged-out users: hero, features, FAQ, and three pricing tiers with monthly/annual toggle. CTAs route to sign-up with selected plan (billing UI only).

## Acceptance criteria

- [x] `LandingPage` + `PricingSection` + `subscriptionPlans.js`
- [x] App flow: landing → auth → dashboard
- [x] Auth shows selected plan on sign-up; back to home
- [x] Cyber theme; INR pricing; “most popular” anchor tier

## Out of scope

- Razorpay/Stripe checkout; plan enforcement in DB; react-router
