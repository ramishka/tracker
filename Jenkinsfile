node {
        stage ('Print')
        stage( 'Checkout') {
            sh 'env > env.txt' 
            for (String i : readFile('env.txt').split("\r?\n")) {
                println i
            }
        }
        checkout scm
        //stage ( 'Linting')
        //setGitHubPullRequestStatus context: 'Linting', message: 'Linting started', state: 'PENDING'
        stage('Build') {   
        echo "build step 1"
        sh'''
            echo $BRANCH_NAME
            tokenv=f42fbf09691d29757203edf4ac940fe8d6df10f8xxxx
            tokenval=${tokenv::-4}
            sha1=$(git ls-remote --heads git@github.com:ramishka/tracker.git | grep "refs/heads/$BRANCH_NAME$" | awk '{print $1}')
            
            curl -XPOST -H "Authorization: token $tokenval" https://api.github.com/repos/ramishka/tracker/statuses/$sha1 -d '{
                "state": "pending",
                "target_url": "https://ci.createlyresources.com/job/Pull%20Request%20Sanitizers/job/ramishka-tracker/",
                "description": "Linting started",
                "context": "jenkins-ci-code-quality"
            }'

            curl -XPOST -H "Authorization: token $tokenval" https://api.github.com/repos/ramishka/tracker/statuses/$sha1 -d '{
                "state": "pending",
                "target_url": "https://ci.createlyresources.com/job/Pull%20Request%20Sanitizers/job/ramishka-tracker/",
                "description": "Started Testing",
                "context": "jenkins-ci-unit-test"
            }'

            exit 0
        '''
    }
    stage('Lint'){
        echo "lint step 1"
    }
    stage('Test') {
        echo "deploy step 1"
    }
}