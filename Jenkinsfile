node {
        stage( 'Checkout')
        checkout scm
        //stage ( 'Linting')
        //setGitHubPullRequestStatus context: 'Linting', message: 'Linting started', state: 'PENDING'
        stage('Build') {   
        echo "build step 1"
        sh'''
            echo $BRANCH_NAME
            echo $GITHUB_BRANCH_HEAD_SHA
            tokenv=f42fbf09691d29757203edf4ac940fe8d6df10f8xxxx
            tokenval=${tokenv::-4}
            echo $(git ls-remote --heads git@github.com:ramishka/tracker.git | grep "refs/heads/$BRANCH_NAME$" | awk '{print $1}')
            PRNO=`grep -o '[0-9]*' <<< $sha1`
            curl -s -H "Authorization: token $tokenval" https://api.github.com/repos/ramishka/tracker/pulls/$PRNO>gitjson.txt && COMMITSHA=$(python -c "import json; f=open('./gitjson.txt', 'r'); d=json.loads(f.read()); print(d['head']['sha'])")
            rm gitjson.txt

            curl -XPOST -H "Authorization: token $tokenval" https://api.github.com/repos/ramishka/tracker/statuses/$COMMITSHA -d '{
                "state": "pending",
                "target_url": "http://all.creately.com:9000/job/PRValidator",
                "description": "Linting started",
                "context": "jenkins-ci-code-quality"
            }'

            curl -XPOST -H "Authorization: token $tokenval" https://api.github.com/repos/ramishka/tracker/statuses/$COMMITSHA -d '{
                "state": "pending",
                "target_url": "http://all.creately.com:9000/job/PRValidator",
                "description": "Started Testing",
                "context": "jenkins-ci-unit-test"
            }'
        '''
    }
    stage('Lint'){
        echo "lint step 1"
    }
    stage('Test') {
        echo "deploy step 1"
    }
}