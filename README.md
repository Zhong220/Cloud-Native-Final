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

### *Branching Model
- Git flow?
  > ref: [Git Flow 是什麼？為什麼需要這種東西？](https://gitbook.tw/chapters/gitflow/why-need-git-flow#google_vignette)
- Github flow?
  > ref: [讓我們來了解 GitHub Flow 吧！](https://medium.com/@trylovetom/%E8%AE%93%E6%88%91%E5%80%91%E4%BE%86%E4%BA%86%E8%A7%A3-github-flow-%E5%90%A7-4144caf1f1bf)
- Trunk-based Development?
  > ref: [Trunk-based Development - 簡介](https://hackmd.io/@ganhuaking/By6EPv0vq)

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
```bash
# stage changes
$ git add .

# use syntax to write commit message
$ git commit -m "feat(login): wireframe"

# push to remote
$ git push
```

### *merge or rebase
> ref: [Git | 我以為的 Git Rebase 與和 Git Merge 做合併分支的差異](https://medium.com/starbugs/git-%E6%88%91%E4%BB%A5%E7%82%BA%E7%9A%84-git-rebase-%E8%88%87%E5%92%8C-git-merge-%E5%81%9A%E5%90%88%E4%BD%B5%E5%88%86%E6%94%AF%E7%9A%84%E5%B7%AE%E7%95%B0-cacd3f45294d)
- `git merge`?
- `git rebase`?