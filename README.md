# Final Project - 成團 APP
## Project Information
> Project management: [Trello](https://trello.com/invite/b/670150e8404f03b92ab3844e/ATTId872c43e67d96215e967c78251330e95E940803F/cnsdm-final-project-management)<br>
> When to **Meeting**: 20:00 per Sat.<br>
> Meeting **Record**: [Notion](https://www.notion.so/Final-Project-11531c02fb3f80cd8e37c8d0b8f6802e?pvs=4)<br>
> Meeting **URL**: [Google Meet](https://meet.google.com/vwa-iikc-fku) <br>
> Planning **URL**:bulb:: [Planning](./docs/planning/readme.md)<br>

<details><summary><b>Team</b></summary>

- 資科三 [__劉子宏__](https://github.com/EricLiu750501) 組長
- 資科四 [__潘煜智__](https://github.com/YCNeo718)
- 資科四 [__鄭睿宏__](https://github.com/RyanCheng98153)
- 資科三 [__黃蓉容__](https://github.com/Zhong220)
</details>

<details><summary><b>Specification</b></summary>

- **Frontend**: `React Native` in `TypeScript`
- **Backend**: `Golang` in `Go`
- **Database**: `SQL Lite`
  
> Reference:<br>
> [`React Native`](https://reactnative.dev/)<br>
> [`Golang`](https://go.dev/doc/)

</details>

## Collaboration Specfications
### Branching Model - Git Flow
![Git Flow](./docs/Images/Git%20Flow.png)
> ref: [Git Flow 整體概念](https://alincode.github.io/git-workshop/git-flow/)


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

### `merge` / `merge --squash` 使用時機:
- 在 __上層__ : `merge` 下層
- 在 __下層__ : `merge --squash` 上層
- eg.
    ```bash
    # on dev
    $ git merge feat/login

    # on feat/login
    $ git merge --squash main
    ```
> ref: [Git | 我以為的 Git Rebase 與和 Git Merge 做合併分支的差異](https://medium.com/starbugs/git-%E6%88%91%E4%BB%A5%E7%82%BA%E7%9A%84-git-rebase-%E8%88%87%E5%92%8C-git-merge-%E5%81%9A%E5%90%88%E4%BD%B5%E5%88%86%E6%94%AF%E7%9A%84%E5%B7%AE%E7%95%B0-cacd3f45294d)