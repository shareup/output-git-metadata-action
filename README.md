# GitHub action to output git metadata

## Usage

```yml
name: yo
on:
  push:

jobs:
  yo:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v1
      - name: meta
        uses: shareup/output-git-metadata-action@master
      - name: print debugging info
        run: |
          echo "branch: ${BRANCH}"
        env:
          BRANCH: ${{ steps.meta.outputs.branch }}
```

## Outputs

* `branch`
* `issue_number`
* `owner`
* `repo`
* `sha`
