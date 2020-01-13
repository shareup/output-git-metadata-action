import { setOutput } from '@actions/core'
import { context } from '@actions/github'

(() => {
  setOutput('owner', context.repo.owner)
  setOutput('repo', context.repo.repo)

  if (context.issue.number) {
    setOutput('issue_number', context.issue.number.toString())
  }

  setOutput('branch', branch())
  setOutput('sha', sha())
})()

function sha () {
  return context.payload.after
}

function branch () {
  if (context.payload.pull_request) {
    return context.payload.pull_request.head.ref
  } else {
    // the first two segments are not the branch
    return context.ref.split('/').slice(2).join('/')
  }
}
