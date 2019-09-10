# Simple Git Commands

### These are the steps for cloning a repository from github and modify it.
- `git clone` using ssh or https, you can copy a repository into your local machine  (This only needs to be done once)

- `git pull` this pulls any changes made by others in the repository into your local machine.

- `git status` shows the files you modified
- `git add <files modified>` adds files you modified to the list of files to commit.
- `git commit -m "Description of changes made"` Applies changes to local repository.
- `git push` pushes the changes to remote repository on github

## Other useful commands
- `git checkout <branchName>` switches branches
- `git checkout -b <branchName>` creates branch

### Good practices

- When working on new features, always create a branch with name "feature/featureName"
- When working on a big FIX, always create a branch with name "fix/fixName". For minor bug fixes, make changes directly on `master`

After you complete work on your branch, go into to github and make a `Pull Request`. In there, describe your changes and select people to review them.
Once your changes are reviewed and approved, they will be merged into the `master` branch