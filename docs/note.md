## Fork
```bash
PS E:\project\Cloud-Native-Final> git fetch root
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 242 bytes | 1024 bytes/s, done.
From https://github.com/YCNeo718/Cloud-Native-Final
   e65a698..0223baf  feat/login -> root/feat/login
PS E:\project\Cloud-Native-Final> git branch -r
  origin/HEAD -> origin/main
  origin/main
  root/dev
  root/feat/login
  root/main
PS E:\project\Cloud-Native-Final> ls


    目錄: E:\project\Cloud-Native-Final


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----      2024/10/20  上午 01:12                docs
d-----      2024/10/20  上午 01:12                src
-a----      2024/10/20  上午 01:12             11 .gitignore
-a----      2024/10/20  上午 01:12           3101 CONTRIBUTING.md
-a----      2024/10/20  上午 01:12            816 README.md


PS E:\project\Cloud-Native-Final> git switch feat/login
Already on 'feat/login'
Your branch is behind 'root/feat/login' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)
PS E:\project\Cloud-Native-Final> git pull
Updating e65a698..0223baf
Fast-forward
 .gitkeep | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 .gitkeep
PS E:\project\Cloud-Native-Final> ls


    目錄: E:\project\Cloud-Native-Final


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----      2024/10/20  上午 01:12                docs
d-----      2024/10/20  上午 01:12                src
-a----      2024/10/20  上午 01:12             11 .gitignore
-a----      2024/10/20  上午 01:49              0 .gitkeep
-a----      2024/10/20  上午 01:12           3101 CONTRIBUTING.md
-a----      2024/10/20  上午 01:12            816 README.md


PS E:\project\Cloud-Native-Final>
```