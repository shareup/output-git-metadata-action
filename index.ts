import { getInput, setOutput } from '@actions/core'
import { context } from '@actions/github'

const debug = isTrue(getInput('debug'))

;(() => {
  output('owner', context.repo.owner)
  output('repo', context.repo.repo)

  if (context.issue.number) {
    output('issue_number', context.issue.number.toString())
  }

  output('branch', branch())
  output('sha', sha())
})()

function output (name: string, value: string) {
  if (debug) {
    console.debug('outputting', name, value)
  }

  setOutput(name, value)
}

function sha (): string | null {
  return context.payload.after
}

function branch (): string | null {
  if (context.payload.pull_request) {
    return context.payload.pull_request.head.ref
  } else {
    // the first two segments are not the branch
    return context.ref.split('/').slice(2).join('/')
  }
}

function isTrue (value: boolean | string): boolean {
  return value === true || value === 'true'
}
