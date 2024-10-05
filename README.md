# Final Project
## Project Information
> Project management: [Trello]()<br>
> When to **Meeting**: 20:00 per Sat.<br>
> Meeting **Record**: [Notion](https://www.notion.so/Final-Project-11531c02fb3f80cd8e37c8d0b8f6802e?pvs=4)<br>
> Meeting **URL**: [Google Meet](https://meet.google.com/vwa-iikc-fku)

<details><summary><b>Team</b></summary>

- 資科三 [__劉子宏__](https://github.com/EricLiu750501) 組長
- 資科四 [__潘煜智__](https://github.com/YCNeo718)
- 資科四 [__鄭睿宏__](https://github.com/RyanCheng98153)
- 資科三 [__黃蓉容__](https://github.com/Zhong220)
</details>

## Collaboration Specfications

### Branching Model
- Git flow?
- Github flow?
- Trunk-based Development?

### Commit syntax
- `feat`: introduce a new feature
- `fix`: patches a bug in your codebase (bugfix or hotfix)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `build`: changes that affect the build system or external dependencies
- `chore`: updates dependencies and does not relate to fix or feat and does not modify src or test files.
- `ci`: changes that affect the continuous integration process
- `docs`: updates the documentation or introduce documentation
- `style`: updates the formatting of code; remove white spaces, add missing spaces, remove unnecessary newlines
- `perf`: improve performance
- `test`: add/remove/update tests
- `revert`: reverts one or many previous commits
  
__Usage__: `feat(scope): commit message`

eg.
```bash
# stage changes
$ git add .

# use syntax to write commit message
$ git commit -m "feat(login): wireframe"

# push to remote
$ git push
```

### How to merge branch
- `git merge`?
- `git rebase`?