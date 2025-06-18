
# Deployment Guidelines

## Live Branch for GitHub Integration

When connecting your backend service (like Firebase App Hosting) to your GitHub repository, you'll likely be asked to specify a "live branch" or "production branch".

**What is a live branch?**

The live branch is the specific Git branch in your repository that the deployment service will monitor. When you push changes (commits) or merge pull requests into this branch, it will typically trigger an automatic build and deployment of your application to your live (production) environment.

**Common Choices for a Live Branch:**

*   **`main`**: This is the most common default branch name for new GitHub repositories and is widely adopted as the primary branch for production-ready code. If you don't have a specific or complex branching strategy, `main` is an excellent and often recommended choice.
*   **`master`**: Older repositories (created before GitHub switched the default from `master` to `main`) often use `master` as their default and production branch. If your repository uses `master`, this would be your live branch.
*   **`production` or `prod`**: Some development teams prefer to have a dedicated branch specifically for production releases. Code from development or staging branches is merged into this `production` branch when it's ready to go live.
*   **Other specific names**: Depending on your team's workflow, you might have other names like `release`, `stable`, etc.

**Recommendation:**

For most projects, using **`main`** as your live branch is recommended, especially if it's the default branch for your repository.

**Important Considerations:**

*   Ensure that this branch always contains the version of your code that you want to be live and accessible to your users.
*   Be mindful of your team's branching strategy and commit practices for this branch to avoid deploying unfinished or buggy code to production.
*   The service you are connecting (e.g., Firebase App Hosting) will use this branch as the source of truth for your production deployments.
