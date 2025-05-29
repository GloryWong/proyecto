import type { Mock } from 'bun:test'
import { afterEach, beforeAll, beforeEach, describe, expect, it, mock } from 'bun:test'
import { main } from '../main'
import { mockModule } from './__helpers__/mock-module'

it('should return false if failed to init', async () => {
  await mockModule('./init.js', () => ({
    init: async () => false,
  }))

  expect(await main([])).toBeFalse()
})

describe('Open', () => {
  it('should execute opening project when argv[0] is `open`', async () => {
    await mockModule('./init.js', () => ({
      init: async () => true,
    }))
    const mockOpenProject = mock(() => true)
    await mockModule('./open-project.js', () => ({
      openProject: mockOpenProject,
    }))

    await main(['open', 'test'])

    expect(mockOpenProject).toHaveBeenCalledWith('test')
  })
})

describe('Create', () => {
  let mockCreateEmptyProject: Mock<any>

  beforeAll(async () => {
    await mockModule('./init.js', () => ({
      init: async () => true,
    }))
  })

  beforeEach(async () => {
    mockCreateEmptyProject = mock()
    await mockModule('./create-empty-project.js', () => ({
      createEmptyProject: mockCreateEmptyProject,
    }))
  })

  afterEach(() => {
    mockCreateEmptyProject.mockRestore()
  })

  it('should execute creating project when argv[0] is `create`', async () => {
    await mockModule('@inquirer/input', () => ({
      default: async () => '',
    }))

    await main(['create'])

    expect(mockCreateEmptyProject).toHaveBeenCalled()
  })

  it('should use argv[1] as project name if it is not empty', async () => {
    await mockModule('@inquirer/input', () => ({
      default: async () => 'test1',
    }))

    await main(['create', 'test2'])

    expect(mockCreateEmptyProject).toHaveBeenCalledWith('test2', expect.objectContaining({}))
  })

  it('should prompt to enter project name if argv[1] is empty', async () => {
    await mockModule('@inquirer/input', () => ({
      default: async () => 'test',
    }))

    await main(['create'])

    expect(mockCreateEmptyProject).toHaveBeenCalledWith('test', expect.objectContaining({}))
  })

  it('should the git be true by default, otherwise false if the option `--no-git` is provided', async () => {
    await mockModule('@inquirer/input', () => ({
      default: async () => '',
    }))

    await main(['create', 'test'])
    expect(mockCreateEmptyProject).toHaveBeenCalledWith('test', expect.objectContaining({
      git: true,
    }))

    mockCreateEmptyProject.mockClear()
    await main(['create', 'test', '--no-git'])
    expect(mockCreateEmptyProject).toHaveBeenCalledWith('test', expect.objectContaining({
      git: false,
    }))
  })

  it('should the open be false by default, otherwise true if the option `--open` is provided', async () => {
    await mockModule('@inquirer/input', () => ({
      default: async () => '',
    }))

    await main(['create', 'test'])

    expect(mockCreateEmptyProject).toHaveBeenCalledWith('test', expect.objectContaining({
      open: false,
    }))

    mockCreateEmptyProject.mockClear()
    await main(['create', 'test', '--open'])

    expect(mockCreateEmptyProject).toHaveBeenCalledWith('test', expect.objectContaining({
      open: true,
    }))
  })
})

describe('Clone', () => {
  const testURL = 'https://github.com/a/b/c.git'
  let mockCloneProject: Mock<any>
  let mockInput: Mock<any>

  beforeAll(async () => {
    await mockModule('./init.js', () => ({
      init: async () => true,
    }))
  })

  beforeEach(async () => {
    mockCloneProject = mock()
    await mockModule('./clone-project.js', () => ({
      cloneProject: mockCloneProject,
    }))
    mockInput = mock(async () => undefined)
    await mockModule('@inquirer/input', () => ({
      default: mockInput,
    }))
  })

  afterEach(() => {
    mockCloneProject.mockRestore()
    mockInput.mockRestore()
  })

  it('should execute cloning project if argv[0] is `clone`', async () => {
    await main(['clone', testURL])

    expect(mockCloneProject).toHaveBeenCalled()
  })

  it('should prompt to enter url if argv[1] is empty', async () => {
    await main(['clone'])

    expect(mockInput).toHaveBeenCalled()
  })

  it('should use argv[1] as the url if it is not empty', async () => {
    await main(['clone', testURL])

    expect(mockCloneProject).toHaveBeenCalledWith(testURL, expect.objectContaining({}))
  })

  it('should the open be false by default, otherwise true if `--open` is provided', async () => {
    await main(['clone', testURL])

    expect(mockCloneProject).toHaveBeenCalledWith(testURL, expect.objectContaining({
      open: false,
    }))

    mockCloneProject.mockClear()
    await main(['clone', testURL, '--open'])

    expect(mockCloneProject).toHaveBeenCalledWith(testURL, expect.objectContaining({
      open: true,
    }))
  })
})

describe('Delete', () => {
  let mockDeleteProject: Mock<any>

  beforeAll(async () => {
    await mockModule('./init.js', () => ({
      init: async () => true,
    }))
  })

  beforeEach(async () => {
    mockDeleteProject = mock()
    await mockModule('./delete-project.js', () => ({
      deleteProject: mockDeleteProject,
    }))
  })

  afterEach(() => {
    mockDeleteProject.mockRestore()
  })

  it('should execute deleting project if argv[0] is `delete`', async () => {
    await main(['delete'])

    expect(mockDeleteProject).toHaveBeenCalled()
  })

  it('should use argv[1] as project name', async () => {
    await main(['delete', 'test'])

    expect(mockDeleteProject).toHaveBeenCalledWith('test')
  })
})

it('should show version and return true if `--version` is provided', async () => {
  const mockShowVersion = mock()
  await mockModule('./utils/showVersion.js', () => ({
    showVersion: mockShowVersion,
  }))

  const result = await main(['--version'])
  expect(mockShowVersion).toHaveBeenCalled()
  expect(result).toBeTrue()
})

it('should show help and return true if `--help` is provided', async () => {
  const mockShowHelp = mock()
  await mockModule('./utils/showHelp.js', () => ({
    showHelp: mockShowHelp,
  }))

  const result = await main(['--help'])
  expect(mockShowHelp).toHaveBeenCalled()
  expect(result).toBeTrue()
})

it('should execute searching for a project and open it if neither valid command nor valid option is provided', async () => {
  const mockSearchProject = mock()
  await mockModule('./utils/searchProject.js', () => ({
    searchProject: mockSearchProject,
  }))

  await main(['anything', 'else'])
  expect(mockSearchProject).toHaveBeenCalledWith(expect.stringMatching(/project/i), true)

  mockSearchProject.mockClear()
  await main([])
  expect(mockSearchProject).toHaveBeenCalledWith(expect.stringMatching(/project/i), true)
})
