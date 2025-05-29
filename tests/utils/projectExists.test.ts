import { join } from 'node:path'
import { describe, expect, it, mock } from 'bun:test'
import { ensureDir } from 'fs-extra'
import { ROOT_DIR } from '../../constants'
import { projectExists } from '../../utils/projectExists'
import { mockModule } from '../__helpers__/mock-module'

it('should return false when given project does not exist', async () => {
  expect(await projectExists('test-name')).toBeFalse()
})

describe('when given project exists', () => {
  it('should return true', async () => {
    await mockModule('./utils/openProjectInEditor', () => ({
      openProjectInEditor: async () => undefined,
    }))
    await mockModule('@inquirer/confirm', () => ({
      default: async () => undefined,
    }))
    await ensureDir(join(ROOT_DIR, 'test-name'))

    expect(await projectExists('test-name')).toBeTrue()
  })

  it('should by default prompt to open in editor', async () => {
    await mockModule('./utils/openProjectInEditor', () => ({
      openProjectInEditor: async () => undefined,
    }))
    const mockConfirm = mock(async () => undefined)
    await mockModule('@inquirer/confirm', () => ({
      default: mockConfirm,
    }))

    await ensureDir(join(ROOT_DIR, 'test-name'))
    await projectExists('test-name')

    expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('test-name'),
    }))
  })

  it('should not prompt to open in editor when promptToOpen is set to false', async () => {
    await mockModule('./utils/openProjectInEditor', () => ({
      openProjectInEditor: async () => undefined,
    }))
    const mockConfirm = mock(async () => undefined)
    await mockModule('@inquirer/confirm', () => ({
      default: mockConfirm,
    }))

    await ensureDir(join(ROOT_DIR, 'test-name'))
    await projectExists('test-name', { promptToOpen: false })

    expect(mockConfirm).not.toHaveBeenCalled()
  })

  it('should prompt to open in editor with default false for confirmation', async () => {
    await mockModule('./utils/openProjectInEditor', () => ({
      openProjectInEditor: async () => undefined,
    }))
    const mockConfirm = mock(async () => undefined)
    await mockModule('@inquirer/confirm', () => ({
      default: mockConfirm,
    }))

    await ensureDir(join(ROOT_DIR, 'test-name'))
    await projectExists('test-name')

    expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
      default: false,
    }))
  })

  it('should prompt to open in editor with passed promptToOpenDefault true for confirmation', async () => {
    await mockModule('./utils/openProjectInEditor', () => ({
      openProjectInEditor: async () => undefined,
    }))
    const mockConfirm = mock(async () => undefined)
    await mockModule('@inquirer/confirm', () => ({
      default: mockConfirm,
    }))

    await ensureDir(join(ROOT_DIR, 'test-name'))
    await projectExists('test-name', { promptToOpenDefault: true })

    expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
      default: true,
    }))
  })
})
