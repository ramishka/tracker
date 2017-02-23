node {
    stage( 'Checkout')
        checkout scm
    stage('Build') {   
        echo "build step 1"
        sh'''
            #!/bin/bash
            PRNO=`grep -o '[0-9]*' <<< $sha1`
            curl -s -H "Authorization: token 09628938765f48c189600e81725dc0d6ee1d1dbb" https://api.github.com/repos/tymspy/ionic-ci-sample/pulls/$PRNO>gitjson.txt && COMMITSHA=$(python -c "import json; f=open('./gitjson.txt', 'r'); d=json.loads(f.read()); print(d['head']['sha'])")
            rm gitjson.txt

            curl -XPOST -H "Authorization: token 09628938765f48c189600e81725dc0d6ee1d1dbb" https://api.github.com/repos/tymspy/ionic-ci-sample/statuses/$COMMITSHA -d '{
                "state": "pending",
                "target_url": "http://all.creately.com:9000/job/PRValidator",
                "description": "Linting started",
                "context": "jenkins-ci-code-quality"
            }'

            curl -XPOST -H "Authorization: token 09628938765f48c189600e81725dc0d6ee1d1dbb" https://api.github.com/repos/tymspy/ionic-ci-sample/statuses/$COMMITSHA -d '{
                "state": "pending",
                "target_url": "http://all.creately.com:9000/job/PRValidator",
                "description": "Started Testing",
                "context": "jenkins-ci-unit-test"
            }'
        '''
    stage('Lint'){
        echo "lint step 1"
    }
    stage('Test') {
        echo "deploy step 1"
    }
}