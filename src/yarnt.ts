#!/usr/bin/env node
import shell from 'child_process'
import args from 'args'
import chalk from 'chalk'

args
  .option('-D --dev', 'install devDependencies', false)
  .command(
    'add',
    'Install your npm packages and types',
    (_, sub: string[], options) => {
      const types: string[] = []
      sub.forEach((item) =>
        types.push(`@types/${item.replace('@', '').replace('/', '__')}`)
      )
      let str = `yarn add ${sub.join(' ')}`
      // @ts-ignore
      if (options.dDev) {
        str += ' -D'
      }
      console.log(chalk.cyan('开始安装依赖'))
      shell.execSync(str, { stdio: 'inherit' })
      console.log(chalk.cyan('开始安装 types'))
      shell.execSync(`yarn add -D ${types.join(' ')}`, { stdio: 'inherit' })
    }
  )

args.parse(process.argv)
