import fuzzysort from 'fuzzysort'

export function fuzzyProjects(projects: string[], term?: string) {
  if (!term?.trim()) {
    return projects
  }

  return fuzzysort.go(term, projects).map(v => v.target)
}
