// Type of CI job
TYPE = "generic"

// The version of the CI Type that will be used
CI_VERSION = "3"

EXECUTION_ENV_DOCKER = "artifactory.qvantel.net/jenkins-ci-default:1.0.24"

NODEJS_VERSION = "8.10.0"

// Set to full, simple or auto
BUILD_TYPE = "simple"

// Email recipients, whitespace separated
EMAIL_RECIPIENTS = ""

DELIVERY_BRANCHES = []

BITBUCKET_PROJECT="OM"

SONARQUBE_SCANNER_CONFIGURATION_FILE = "sonar.properties"

// Used to decide if unit test results should be reported to Qter
QTER_UNITTEST_REPORTING = true

// Type of unit test.
QTER_UNITTEST_TYPE = "jest"

OMNI_UI_COMMON_REPO = "ssh://git@stash.qvantel.net:7999/om/omni-ui-common-pos.git"
OMNI_UI_APPS_REPO = "ssh://git@stash.qvantel.net:7999/om/omni-ui-app-pos.git"

/*
Build steps:
1. Setup environment
- clone omni-ui-common-pos at current commit ID
- resolve current commit id and attempt to checkout similarly named branch in omni-ui-app-pos (fallback to develop) to 'omni-ui-app-pos' folder
2. Compile
- Run 'npm run bootstrap:jenkins-build-ui-common' in 'omni-ui-app-pos' folder
    - Results in symlinked dependencies
3. Unit tests
- Run fast operations first to fail fast:
    - Run lint
    - Run flow
    - Run coverage
4. Integration test
- Run fastest operations first to fail fast:
    - Run 'npm run build' in packages
    - Create translations to detect duplicate message IDs in 'omni-ui-app-pos'
    - Run 'npm run build' in channels
*/

node ('static-agent') {

  @Library('jenkins-pipeline-loader@master') _

  // Do not add anything here - use beforePipeline()
  qPipeline jenkinsfile:this
}


def doCheckout() {
  checkout scm

  def workspace = pwd()
  def targetBranchName = env.BRANCH_NAME;

  if(pipelineBase.isPullRequest()) {
    targetBranchName = env.CHANGE_BRANCH;
  }
  def gitBranchName = "origin/${targetBranchName}"

  echo "Checking out omni-ui-app-pos with branch ${gitBranchName}"

  dir('omni-ui-app-pos') {
    // Clone omni-ui-app-pos so that we can symlink the packages. Attempts to checkout with same branch name as current omni-ui-common-pos branch, but defaults to develop if no such branch is found.
    checkout([$class: 'GitSCM',
                branches: [[name: "${gitBranchName}"], [name: "develop"]],
                doGenerateSubmoduleConfigurations: false,
                submoduleCfg: [],
                userRemoteConfigs: [[credentialsId: 'jenkins-stash-ssh', url: OMNI_UI_APPS_REPO]]])
  }
}

def compile() {
  echo "author email $env.GIT_AUTHOR_EMAIL"
  echo "committer email $env.GIT_COMMITTER_EMAIL"
  echo "committer $env.GIT_COMMITTER"
  echo "Bootstrapping environment"
  dir('omni-ui-app-pos') {
      sh "npm run bootstrap:jenkins-build-ui-common"
  }
}

def unitTest() {
    echo 'Running "omni-ui-common-pos" tests'
    sh "npm run test-messages-interfaces"
    sh "npm run lint"
    sh "npm run flow"
    sh "npm run coverage:jenkins"
}

def integrationTest() {
  echo 'Integration tests'
  echo 'Building "omni-ui-common-pos" packages'
  sh "npm run build-packages"

  dir('omni-ui-app-pos') {

    echo 'Getting messages and creating a default translation'
    dir('channels/omnichannel-customization-pos/') {
      sh 'npm run messages:jenkins-build-ui-common'
    }

    echo 'Running parallel "npm run build" for channel applications'
    parallel (
      posrunbuild: { sh "npm run build-pos" }
    )
  }
}
