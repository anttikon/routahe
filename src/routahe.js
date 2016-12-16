import program from 'commander'
import {action} from './route'
import {parseArguments} from './argumentParser'
import {gray} from 'chalk'

program.on('--help', function() {
  console.log('  Examples:')
  console.log('')
  console.log(gray('    Default from - to usage'))
  console.log('    $ routahe kamppi pasila')
  console.log('')
  console.log(gray('    Search for your current location using nearby wifi access points.'))
  console.log('    $ routahe pasila')
  console.log('')
  console.log(gray('    Specify departure time'))
  console.log('    $ routahe kamppi pasila 5:30')
  console.log('')
  console.log(gray('    Specify arrival time with @'))
  console.log('    $ routahe kamppi pasila @12:30')
  console.log('')
  console.log(gray('    Specify date with time'))
  console.log('    $ routahe kamppi pasila 12:30 24.12.2016')
  console.log('')
})

program
  .arguments('<arg1> [arg2] [arg3] [arg4]')
  .action((arg1, arg2, arg3, arg4) => action(parseArguments([arg1, arg2, arg3, arg4])).catch(e => {
    console.log('Error with action', e)
  }))
  .parse(process.argv)

