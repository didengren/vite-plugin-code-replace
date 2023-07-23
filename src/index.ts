import type { Plugin } from 'vite'
import type { TransformResult } from 'rollup'
import MagicString from 'magic-string'
import { createFilter } from '@rollup/pluginutils'
import { CACHED_REPLACE_OPTIONS, generateReplacementMap, OptionWithName, Option } from './utils'

export default (options: Array<OptionWithName> = []): Plugin => {
  generateReplacementMap(options)
  const filter = createFilter(['**/*.(js|ts|jsx|tsx|vue)'])

  return {
    name: 'vite-plugin-code-replace',
    async transform(code: string, id: string): Promise<TransformResult> {
      if (!filter(id) || CACHED_REPLACE_OPTIONS.length() === 0) {
        return null
      }

      const ms = new MagicString(code)
      // 1. replace in specify file
      const replacementSpecifyFiles: Array<Option> = []
      const specifyFiles = CACHED_REPLACE_OPTIONS.files().filter((k) => {
        return new RegExp(k).test(id)
      })
      specifyFiles.forEach((k) => {
        replacementSpecifyFiles.push(...(CACHED_REPLACE_OPTIONS.get(k) ?? []))
      })
      // 2. replace in all(.*) file
      replacementSpecifyFiles.push(...CACHED_REPLACE_OPTIONS.defaultFile())
      // 3. do replace
      replacementSpecifyFiles.forEach(({ search, replace }) => {
        ms.replaceAll(new RegExp(search, 'g'), replace)
      })
      // if string has been changed, then return map, else return null
      if (ms.hasChanged()) {
        const result = {
          code: ms.toString(),
          map: ms.generateMap({
            file: id,
            includeContent: true,
          }),
        }
        return result
      }
      return null
    },
  }
}
