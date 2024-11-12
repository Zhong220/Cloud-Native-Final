# CONTRIBUTING
## Specifications
### **Frontend**
- Framework: `React Native`
  - Native Version: `0.74.5`
  - React Version: `18.2.0`
- Language: `TypeScript`
  - Version: `~5.3.3`
### **Backend**
- Framework: `Express.js`
- Language: `JavaScript`
- Runtime: `Node.js` or `Deno 2` ?
- Version: `v20.18.0`
### **Database**
- Management System: `SQLite`
- Version: 

## Collaboration
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
  
__Usage__: 
* Nomal case: `feat(scope): commit message`
* Significant changes: `feat(scope)!: commit message`
```bash
# stage changes
$ git add .

# use syntax to write commit message
# Normal case
$ git commit -m "feat(login): wireframe"
# Significant changes
$ git commit -m "feat(api)!: changes"

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

## Reference:<br>
### React Native
- [React Native official](https://reactnative.dev/)
- [React Native Tutorial for Beginners - Build a React Native App](https://www.youtube.com/watch?v=0-S5a0eXPoc&list=PLTjRvDozrdlxzQet01qZBt-sRG8bbDggv&index=1)
### React Native MQTT
- [How to Use MQTT in The React Native Project](https://www.emqx.com/en/blog/how-to-use-mqtt-in-react-native)
### Git
- [【狀況題】怎麼跟上當初 fork 專案的進度？](https://gitbook.tw/chapters/github/syncing-a-fork)
- [Notes: Fork All Branches](docs/note.md) 
### Golang
- [Golang](https://go.dev/doc/)
- [Go语言的七大适用场景](https://juejin.cn/post/7213576339328434233)
### Backend Struc.
- [菜雞新訓記 (5): 使用 三層式架構 來切分服務的關注點和職責吧](https://igouist.github.io/post/2021/10/newbie-5-3-layer-architecture/)
- [三層式架構](https://sunnyday0932.github.io/2020/%E4%B8%89%E5%B1%A4%E5%BC%8F%E6%9E%B6%E6%A7%8B/)
- [IT 幫幫忙 : Day 06 - MVC 與三層架構](https://ithelp.ithome.com.tw/m/articles/10268951)
### Deno
- [Deno Docs](https://docs.deno.com/)
### Docker
- [Docker Docs](https://docs.docker.com/)
- [Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker Compose Tutorial](https://www.youtube.com/watch?v=HG6yIjZapSA)
- [eclipse-mosquitto - Official Image](https://hub.docker.com/_/eclipse-mosquitto)
- [[ECS] Amazon Elastic Container Service](https://aws.amazon.com/tw/ecs/)
### Chatroom
- [聊天室系統設計](https://medium.com/@eason91367/%E8%81%8A%E5%A4%A9%E5%AE%A4%E7%B3%BB%E7%B5%B1%E8%A8%AD%E8%A8%88-c5551932a0af)
- [Chat App System Design — 聊天系統設計](https://medium.com/@a86gj3sp4/chat-app-system-design-%E8%81%8A%E5%A4%A9%E7%B3%BB%E7%B5%B1%E8%A8%AD%E8%A8%88-e518ebb6ec84)
- [[SQS] Amazon Simple Queue Service](https://aws.amazon.com/tw/sqs/)
- [[SNS] Amazon Simple Notification Service](https://aws.amazon.com/tw/sns/)
- [SQS 跟 SNS 的差別在哪?](https://andy51002000.blogspot.com/2018/09/aws-sqs-vs-sns.html)
- [[MQTT] Mosquitto Docker 架設與設定詳細過程](https://weirenxue.github.io/2021/07/01/mqtt_mosquitto_docker/)
- [什麼是 MQTT？](https://aws.amazon.com/tw/what-is/mqtt/)
### ORM
- [[week 17] 後端中階 - 淺談 Sequelize：使用 ORM 框架串接資料庫](https://hackmd.io/@Heidi-Liu/note-be201-sequelize)
### DataBase
- [Amazon Relational Database Service](https://aws.amazon.com/tw/rds/)
### Docs
- [What is User Story Template?](https://www.agilealliance.org/glossary/user-story-template/)