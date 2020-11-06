#GIT FLOW

---

From now on, please check out the "develop" branch and develop in this branch. NO ONE can have any commit on master branch any more.
The commit on master branch should always be merged from other branch, which cannot be taken without approval.
The code in master branch should always be the correct that can be deployed on production.

Please ensure your well tested code are committed to the current branch before switching to another branch.
And please pay enough attention on the Github issue as you will find if you need to switch to another branch to develop the issue from it.

**Please, always push every evening before leaving office**

Also, in any doubt, ask for help for a more experienced git user.

## Branch Definition

### Master (master)

Contains the version of code in production.
All commits to the master branch should be merged from other branch.
Any commit on master should be done with a tag.

### Developing (develop)

Contains the developing code.
All the developing work should start from "develop" branch.

### Feature (feature/\*\*\*)

Created from "develop" branch when you have new feature to develop.
Will create a new feature branch, develop the feature in this branch.
If you work alone on your branch, it would be great to rebase your branch on the develop branch.
When done with the branch, do a pull request, so that git admin can merge the code.
When the feature is merged, branch is delete (both locally and remotely).

### Fix (fix/\*\*\*)

Created from "develop" branch when you have to fix an issue.
Will create a new fix branch, develop the fix in this branch.
If you work alone on your branch, it would be great to rebase your branch on the develop branch.
When done with the branch, do a pull request, so that git admin can merge the code.
When the fix is merged, branch is delete (both locally and remotely).

### Release (release/\*\*\*)

Created from "develop" branch when need to publish a new release.
Will merge the release to master and "develop" branch.
When the release is merged, branch is delete (both locally and remotely).

### Hotfix (hotfix/\*\*\*)

Created from master branch when find any bug in master branch (production).
Will create a hotfix branch, fix the bug in this branch.
When done with the branch, do a pull request, so that git admin can merge the code (into develop and master branches).
When the hotfix is merged, branch is delete (both locally and remotely).

## Workflow

1. Checkout the "develop" branch and work on it by creating branch from it. Never checkout from master.
2. If any new feature or bug need to be done, create a corresponding branch named as "feature/**_" or "fix/_**". The responsible for the work should checkout the new branch and develop on it after commit all works on previous branch. Git admin will merge the branch to corresponding branch (develop or master). After merging, branch is delete both locally and remotely.
3. If any bug is found in production, we will create a branch named as "hotfix/\*\*\*" from the master branch where we found the bug. The responsible for fixing it, should checkout this branch and fix on this branch, after complete testing we will merge this branch to master and developing and consider to have a deployment.
4. If we need to have a release version, we will create a branch named as "release/\*\*\*" from the "developing" branch.

## Branch naming convention

Naming branches is quite difficult and needs focus to stay relevant :

- if task is coming from the java_api project, it means it is an issue.
- if task is coming from the product_backlog project, it means it is a feature.

Here is a simple trick to name branches with git :

```
https://github.org/company/java_api/issues/NUMBER/NAME
	-> fix/NUMBER-NAME
https://github.org/company/product_backlog/issues/NUMBER/NAME
	-> feature/NUMBER-NAME
```

For example :

```
https://github.org/company/java_api/issues/421/conflict-between-inprocess-and-export-when
	-> fix/421-conflict-between-inprocess-and-export-when
https://github.org/company/product_backlog/issues/239/async-tasks-in-operation
	-> feature/239-async-tasks-in-operation
```

This way it is very easy to know what is the root cause for a change.

In a ideal world, every branches should be coming from a task in github =)

## Reference

http://www.cnblogs.com/cnblogsfans/p/5075073.html

## Command cheatsheet

### Clone a repository

    git clone git@github.org:company/PROJECT_NAME.git

You get a new folder "PROJECT_NAME".
THe current branch is "master".
You must not work onto this branch !

### Create branch develop (only do it once on a repo)

    git checkout -t origin/develop

This will create a local branch "develop" that will track the remote branch "origin/develop".
Your workspace is switched to the "develop" branch.

### Switch to a branch

    git checkout BRANCH_NAME

It will switch workspace to the desired branch.
For example, this will swith to the "develop" branch :

    git checkout develop

### Create a feature branch

    git checkout -b feature/XXXXX

This will create a new branch, named "feature/XXXXX".
Workspace is switched to this new branch.

### Review file to version

    git status

This will show you all the files that are under git versionning and are modified.
This will also show you all the files that are not yet under git versionning.

    git diff

This will show you all the modification done onto files under git versionning.

### Add files to git stage

    git add FILE_PATH

This will prepare the next commit.
Add only the files you want to version.
Check the modification you are versionning by doing status and diff before, that way, you guarantee that you won't version something that should not part of the commit.

### Commit files from the index

    git commit -m "MESSAGE"

Your message commit should be explicit.
Don't use very generic message like "fix bug" or "new feature".
Be explicit : "fix bug #42 : impossible to login" or "new feature : add authentication service".
Try to create atomic commit, it is easier for git admin to identify the work done.
Also, it is easier to rollback on a commit.

### Undo the latest commit

Sometimes, you may have commit too fast (wrong file list, wrong message, ...).
In that case, you may need to rollback the committo fix it.

    git reset --soft HEAD~1

In that case, the latest commit is canceled.
All files into the canceled commit are set back to stage.

### Prepare branch for publishing

Your branch was created from the local "develop" branch you had maybe a few days ago.

Your local "develop" branch was in sync with the remote branch a few days ago, but it may not be the case now.
Some branch may have been merged to the remote "develop" branch, you need to get in sync.

    git fetch

This will get all the remote modifications to your index.

Just to be sure you have the last version of the develop branch before rebasing (git fetch can be buggy at times),
you may want to checkout the develop branch and pull the last version.

    git checkout develop

    git pull

This will update your develop branch so you can rebase on the last version.

You now need to go back to your feature branch.

    git checkout feature/xxxx

You are now ready to rebase.

    git rebase origin/develop

This will rebase all your branch work on the newly updated "origin/develop" branch.

For example, there is the local develop branch and your feature branch at the start.
As your develop branch is in sync with the remote branch, both develop branch are the same :

    develop + origin/develop x---x---x------x-----x
    feature/xxxx                                   \---x---x

After doing the fetch, you will get new commits on the origin/\* branches :

    origin/develop                                 /-x---x----x---x-x-x-x--x
    develop                  x---x---x------x-----x
    feature/xxxx                                   \---x---x

To guarantee that your code is working with the current code base, you need to integrate the origin/develop code base to your branch
This is when you need to rebase you code (you may have to resolve conflicts).

    origin/develop                                 /-x---x----x---x-x-x-x--x
    develop                  x---x---x------x-----x
    feature/xxxx                                                            \---x---x

After moving your feature branch to the latest code base and after checking that everything is OK, you are able to publish your branch :

    git push -u origin feature/xxxx

This will create a remote branch for you feature

    origin/develop                                 /-x---x----x---x-x-x-x--x
    develop                  x---x---x------x-----x
    feature/xxxx + origin/feature/xxxx                                      \---x---x

This process needs to be done each time you want to publish code !

### Update branch already published when you are the only branch developper

**This section only concerns branches that have only one developer working on it !!!!!**

Sometimes, you may need to update an existing branch that is already published.
The process is the same as publishing for the first time.
But !
As a feature branch is already published, when doing the rebase, commit ids will be replaced with new ones.
That means it will fail when pushing code.
Git will tell you that commit ids do not match.
In that case, you can force pushing :

    git push -force-with-lease

It will override remote id with the new ones.

**Do this only if you are the only one working on this branch !!!**

### Update branch already published when there are several branch developper

**This section only concerns branches that have several developers working on it !!!!!**

As several developpers share the same commit ids, you must not rebase your commit.
Just commit as usual and push.
No rebase !!!

## Create a pull request

Creating a pull request is done into github website.
Go to :

    https://github.org/company/PROJECT_NAME/pull-requests/

Click on "Create a pull request".

On the new screen, select on the left your feature branch, and on the right the branch you want to be merged (usually, the "develop" branch).
Define explicit title and message.
Check "Close develop after the pull request is merged".

Creating a pull request will notify git admin that your code is ready to be merged.
The git admin will perform a code review, maybe you'll have some adjustments to do in you code.
After the code from your branch is merged, your remote feature branch is deleted.
After that, you should delete your local feature branch as well, your code is in the origin/develop branch anyway.
After that, update your local "develop" branch :

    git checkout develop
    git pull

## Managing branch

As soon as you don't need a branch, you should delete it.
If you don't delete it, you will have a lot of legacy branches and might get lost among them.

This advice works the same for remote branches.
As we don't want git repositories to become a mess, remote branches will get reviewed every day to track their need or not.
