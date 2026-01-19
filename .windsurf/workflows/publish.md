---
description: Publish package to npm registry
---

# Publish to npm

1. **Update version in package.json**
   - Bump the version number (patch/minor/major)
   - Example: 1.1.5 → 1.2.0

2. **Commit and tag the release**
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.2.0"
   git tag v1.2.0
   git push origin main
   git push origin v1.2.0
   ```

3. **Login to npm (if not already logged in)**
   ```bash
   npm login
   ```
   - Enter your npm username
   - Enter your npm password
   - Enter your npm email

4. **Publish the package**
   ```bash
   npm publish
   ```

5. **Verify the package is published**
   - Visit: https://www.npmjs.com/package/create-laju-app
   - Or check with: `npm view create-laju-app`

## Notes

- Make sure you have the correct npm account permissions
- The package name `create-laju-app` must be available or you must own it
- Ensure all files listed in `files` field in package.json are present
- The `publishConfig.access: "public"` setting ensures the package is publicly visible