import { Meteor } from 'meteor/meteor';
// import Links from '/imports/api/links';
import {PythonShell} from 'python-shell';
import {spawn} from 'child_process'
const optiondef = {
  mode:'text',
  scriptPath:"/home/ubuntu/meteor-graphs/imports/python/"
}

Meteor.methods({
  "runPythonCSV"(data) {
    async function run() {
      let dt = await getPython()
      return dt;
    }
    function getPython() {
      return new Promise(function(resolve, reject) {
        console.log(data)
        const options = {
          ...optiondef,
          args:[data]
        }
        PythonShell.run("top_drug.py", options, (err, results) => {
          // console.log(err)
          let ext_data = results[0]
          resolve(ext_data)
        })
      });
    }
    return run();
  }
})
Meteor.startup(() => {
  // If the Links collection is empty, add some data.

});
