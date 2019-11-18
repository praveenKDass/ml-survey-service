const submissionsHelper = require(ROOT_PATH + "/module/submissions/helper")

const observationSubmissionsHelper = require(ROOT_PATH + "/module/observationSubmissions/helper")

module.exports = class ObservationSubmissions extends Abstract {

  constructor() {
    super(observationSubmissionsSchema);
  }

  static get name() {
    return "observationSubmissions";
  }

  /**
* @api {post} /assessment/api/v1/observationSubmissions/make/{{submissionId}} create observation submission
* @apiVersion 1.0.0
* @apiName create observation submission
* @apiGroup Observation Submissions
* @apiParamExample {json} Request-Body:
* {
* 	"evidence": {
*                   "externalId" : "",
*                   "answers" : {
*                       "5be442149a14ba4b5038dce4" : {
*                           "qid" : "",
*                           "responseType":"",
*                           "value" : [ 
*                               {
*                                   "5be442dd9a14ba4b5038dce5" : {
*                                       "qid" : "",
*                                       "value" : "",
*                                       "remarks" : "",
*                                       "fileName" : [],
*                                       "payload" : {
*                                           "question" : [ 
*                                               "", 
*                                               ""
*                                           ],
*                                           "labels" : [ 
*                                               ""
*                                           ],
*                                           "responseType" : ""
*                                       },
*                                       "criteriaId" : ""
*                                   },
*                                   "5be52f5d9a14ba4b5038dd0c" : {
*                                       "qid" : "",
*                                       "value" : [ 
*                                           "String", 
*                                           "String"
*                                       ],
*                                       "remarks" : "",
*                                       "fileName" : [],
*                                       "payload" : {
*                                           "question" : [ 
*                                               "", 
*                                               ""
*                                           ],
*                                           "labels" : [ 
*                                              "String", 
*                                           "String"
*                                           ],
*                                           "responseType" : """
*                                       },
*                                       "criteriaId" : ""
*                                   }
*                               }
*                           ],
*                           "remarks" : "",
*                           "fileName" : [],
*                           "payload" : {
*                               "question" : [ 
*                                   "String"", 
*                                   "Stgring"
*                               ],
*                              "labels" : [ 
*                                   [ 
*                                       [ 
*                                           {
*                                               "_id" : "",
*                                               "question" : [ 
*                                                   "String", 
*                                                   "String"
*                                               ],
*                                               "options" : [ 
*                                                   {
*                                                       "value" : "",
*                                                       "label" : ""
*                                                   }
*                                               ],
*                                               "children" : [],
*                                               "questionGroup" : [ 
*                                                   ""
*                                               ],
*                                               "fileName" : [],
*                                               "instanceQuestions" : [],
*                                               "deleted" : Boolean,
*                                               "tip" : "",
*                                               "externalId" : "",
*                                               "visibleIf" : "",
*                                               "file" : "",
*                                               "responseType" : "",
*                                               "validation" : {
*                                                   "required" : Boolean
*                                               },
*                                               "showRemarks" : Boolean,
*                                               "isCompleted" : Boolean,
*                                               "remarks" : "",
*                                               "value" : "",
*                                               "canBeNotApplicable" : "Boolean",
*                                               "usedForScoring" : "",
*                                               "modeOfCollection" : "",
*                                               "questionType" : "",
*                                               "accessibility" : "",
*                                               "updatedAt" : "Date",
*                                               "createdAt" : "Date",
*                                               "__v" : 0,
*                                               "payload" : {
*                                                   "criteriaId" : ""
*                                               }
*                                           }, 
*                                           {
*                                               "_id" : "",
*                                               "question" : [ 
*                                                   "String", 
*                                                   "String"
*                                               ],
*                                               "options" : [ 
*                                                   {
*                                                       "value" : "",
*                                                       "label" : ""
*                                                   }
*                                               ],
*                                               "children" : [],
*                                               "questionGroup" : [ 
*                                                   "String"
*                                               ],
*                                               "fileName" : [],
*                                               "instanceQuestions" : [],
*                                               "deleted" : Boolean,
*                                               "tip" : "",
*                                               "externalId" : "",
*                                               "visibleIf" : "",
*                                               "file" : "",
*                                               "responseType" : "",
*                                               "validation" : {
*                                                   "required" : Boolean
*                                               },
*                                               "showRemarks" : Boolean,
*                                               "isCompleted" : Boolean,
*                                               "remarks" : "",
*                                               "value" : "",
*                                               "canBeNotApplicable" : "Boolean",
*                                               "usedForScoring" : "",
*                                               "modeOfCollection" : "",
*                                               "questionType" : "",
*                                               "accessibility" : "",
*                                               "updatedAt" : "Date",
*                                               "createdAt" : "Date",
*                                               "__v" : 0,
*                                               "payload" : {
*                                                   "criteriaId" : ""
*                                               }
*                                           }
*                                       ], 
*                                   ]
*                               ],
*                               "responseType" : ""
*                           },
*                           "criteriaId" : ""
*                       }
*                   },
*                   "startTime" : Date,
*                   "endTime" : Date,
*                   "gpsLocation" : "String,String",
*                   "submittedBy" : """,
*                   "isValid" : Boolean
*               }
* }
* @apiUse successBody
* @apiUse errorBody
*/

  async make(req) {
    return new Promise(async (resolve, reject) => {

      try {

        let response = await submissionsHelper.createEvidencesInSubmission(req, "observationSubmissions", false);

        if (response.result.status && response.result.status === "completed") {
          await observationSubmissionsHelper.pushToKafka(req.params._id)
          await observationSubmissionsHelper.generateHtml(req.params._id)
        }

        return resolve(response);

      } catch (error) {

        return reject({
          status: 500,
          message: "Oops! Something went wrong!",
          errorObject: error
        });

      }

    })
  }

  /**
  * @api {get} /assessment/api/v1/observationSubmissions/isAllowed:observationSubmissionId?evidenceId="LW" check submissions status 
  * @apiVersion 1.0.0
  * @apiName check submissions status 
  * @apiGroup Observation Submissions
  * @apiParam {String} evidenceId Evidence ID.
  * @apiSampleRequest /assessment/api/v1/observationSubmissions/isAllowed/5d2c1c57037306041ef0c7ea?evidenceId=SO
  * @apiParamExample {json} Response:
  * "result": {
      "allowed": true
    }
  * @apiUse successBody
  * @apiUse errorBody
  */

  async isAllowed(req) {
    return new Promise(async (resolve, reject) => {

      try {

        let result = {
          allowed: true
        }

        let message = "Observation submission check completed successfully";

        let submissionDocument = await database.models.observationSubmissions.findOne(
          { "_id": req.params._id },
          {
            ["evidences." + req.query.evidenceId + ".isSubmitted"]: 1,
            ["evidences." + req.query.evidenceId + ".submissions"]: 1
          }
        );

        if (!submissionDocument || !submissionDocument._id) {
          throw "Couldn't find the submission document"
        } else {
          if (submissionDocument.evidences[req.query.evidenceId].isSubmitted && submissionDocument.evidences[req.query.evidenceId].isSubmitted == true) {
            submissionDocument.evidences[req.query.evidenceId].submissions.forEach(submission => {
              if (submission.submittedBy == req.userDetails.userId) {
                result.allowed = false
              }
            })
          }
        }

        let response = {
          message: message,
          result: result
        };

        return resolve(response);

      } catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }

    })
  }


  /**
  * @api {get} /assessment/api/v1/observationSubmissions/delete/:observationSubmissionId Delete observation submission. 
  * @apiVersion 1.0.0
  * @apiName Delete observation submission. 
  * @apiGroup Observation Submissions
  * @apiUse successBody
  * @apiUse errorBody
  */

  async delete(req) {
    return new Promise(async (resolve, reject) => {

      try {

        let message = "Observation submission deleted successfully";

        let submissionDocument = await database.models.observationSubmissions.deleteOne(
          {
            "_id": req.params._id,
            status: "started",
            createdBy: req.userDetails.userId
          }
        );

        if (!submissionDocument.n) {
          throw "Couldn't find the submission document"
        }

        let response = {
          message: message
        };

        return resolve(response);

      } catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }

    })
  }

  /**
* @api {get} /assessment/api/v1/observationSubmissions/generateHtml/:observationSubmissionId  observation submissions pdf 
* @apiVersion 1.0.0
* @apiName Generate Observation Submissions PDF 
* @apiGroup Observation Submissions
* @apiUse successBody
* @apiUse errorBody
*/
  async generateHtml(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let generatePdf = await observationSubmissionsHelper.generateHtml(req.params._id)
        return resolve(generatePdf);

      } catch (error) {
        return reject({
          status: 500,
          message: error
        });
      }
    })
  }


  /**
  * @api {get} /assessment/api/v1/observationSubmissions/pdfFileUrl/:observationSubmissionId Get observation submission PDF URL
  * @apiVersion 1.0.0
  * @apiName Get observation submission PDF URL
  * @apiGroup Observation Submissions
  * @apiUse successBody
  * @apiUse errorBody
  */

  async pdfFileUrl(req) {
    return new Promise(async (resolve, reject) => {

      try {

        let result = {
          url: ""
        }

        let message = "Observation submission PDF File URL fetched successfully";

        let submissionDocument = await database.models.observationSubmissions.findOne(
          {
            $and: [
              { "_id": req.params._id },
              { pdfFileUrl: { $ne: "" } },
              { pdfFileUrl: { $exists: true } }
            ]
          },
          {
            pdfFileUrl: 1
          }
        );

        if (!submissionDocument || !submissionDocument._id) {
          message = "PDF not available."
        } else {
          result.url = "https://storage.googleapis.com/sl-" + (process.env.NODE_ENV == "production" ? "prod" : "dev") + "-storage/" + submissionDocument.pdfFileUrl
        }

        let response = {
          message: message,
          result: result
        };

        return resolve(response);


      } catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }

    })
  }

  /**
  * @api {get} /assessment/api/v1/observationSubmissions/pushToKafka/:observationSubmissionId Push observation submission to Kafka
  * @apiVersion 1.0.0
  * @apiName Push observation submission to Kafka
  * @apiGroup Observation Submissions
  * @apiUse successBody
  * @apiUse errorBody
  */

  async pushToKafka(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let pushObservationSubmissionToKafka = await observationSubmissionsHelper.pushToKafka(req.params._id)

        if(pushObservationSubmissionToKafka.status != "success") {
          throw pushObservationSubmissionToKafka.message
        }

        return resolve({
          message: pushObservationSubmissionToKafka.message
        });

      } catch (error) {
        return reject({
          status: 500,
          message: error
        });
      }
    })
  }


  /**
  * @api {get} /assessment/api/v1/observationSubmissions/rate/:entityExternalId?solutionId=:solutionExternalId&createdBy=:keycloakUserId&submissionNumber=:submissionInstanceNumber Rate an Entity Observation
  * @apiVersion 1.0.0
  * @apiName Rate a Single Entity of Observation
  * @apiGroup Observation Submissions
  * @apiParam {String} solutionId Solution External ID.
  * @apiParam {String} createdBy Keycloak user ID.
  * @apiParam {String} submissionNumber Submission Number.
  * @apiSampleRequest /assessment/api/v1/observationSubmissions/rate/1002036?solutionId=EF-DCPCR-2018-001&createdBy=e97b5582-471c-4649-8401-3cc4249359bb&submissionNumber=2
  * @apiUse successBody
  * @apiUse errorBody
  */

  async rate(req) {
    return new Promise(async (resolve, reject) => {

      try {

        req.body = req.body || {};
        let message = "Crtieria rating completed successfully"

        let programId = req.query.programId
        let solutionId = req.query.solutionId
        let entityId = req.params._id

        if (!programId) {
          throw "Program Id is not found"
        }

        if (!solutionId) {
          throw "Solution Id is not found"
        }

        if (!entityId) {
          throw "Entity Id is not found"
        }


        let solutionDocument = await database.models.solutions.findOne({
          externalId: solutionId,
        }, { themes: 1, levelToScoreMapping: 1, scoringSystem : 1, flattenedThemes : 1 }).lean()

        if (!solutionDocument) {
          return resolve({
            status: 400,
            message: "Solution does not exist"
          });
        }

        let queryObject = {
          "entityExternalId": entityId,
          "programExternalId": programId,
          "solutionExternalId": solutionId
        }

        let submissionDocument = await database.models.submissions.findOne(
          queryObject,
          { "answers": 1, "criteria": 1, "evidencesStatus": 1, "entityInformation": 1, "entityProfile": 1, "programExternalId": 1 }
        ).lean();

        if (!submissionDocument._id) {
          throw "Couldn't find the submission document"
        }


        if(solutionDocument.scoringSystem == "pointsBasedScoring") {

          submissionDocument.scoringSystem = "pointsBasedScoring"

          let allCriteriaInSolution = new Array
          let allQuestionIdInSolution = new Array
          let solutionQuestions = new Array

          allCriteriaInSolution = gen.utils.getCriteriaIds(solutionDocument.themes);

          if(allCriteriaInSolution.length > 0) {
            
            submissionDocument.themes = solutionDocument.flattenedThemes

            let allCriteriaDocument = await criteriaHelper.criteriaDocument({
              _id : {
                $in : allCriteriaInSolution
              }
            }, [
              "evidences"
            ])

            allQuestionIdInSolution = gen.utils.getAllQuestionId(allCriteriaDocument);
          }

          if(allQuestionIdInSolution.length > 0) {

            solutionQuestions = await questionsHelper.questionDocument({
              _id : {
                $in : allQuestionIdInSolution
              },
              responseType : {
                $in : [
                  "radio",
                  "multiselect",
                  "slider"
                ]
              }
            }, [
              "weightage",
              "options",
              "responseType"
            ])

          }

          if(solutionQuestions.length > 0) {
            submissionDocument.questionDocuments = {}
            solutionQuestions.forEach(question => {
              submissionDocument.questionDocuments[question._id.toString()] = {
                _id : question._id,
                weightage : question.weightage
              }
              if(question.options && question.options.length > 0) {
                question.options.forEach(option => {
                  (option.score && option.score > 0) ? submissionDocument.questionDocuments[question._id.toString()][`${option.value}-score`] = option.score : ""
                })
              }
            })
          }

        }

        let resultingArray = await submissionsHelper.rateEntities([submissionDocument], "singleRateApi")

        return resolve({ result: resultingArray })

      } catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }

    })
  }

  /**
  * @api {get} /assessment/api/v1/observationSubmissions/multiRate?entityId=:entityExternalId1,:entityExternalId2&solutionId=:solutionExternalId&createdBy=:keycloakUserId&submissionNumber=:submissionInstanceNumber Multi Rate
  * @apiVersion 1.0.0
  * @apiName Rate Multiple Entities of Observation
  * @apiGroup Observation Submissions
  * @apiParam {String} entityId Entity ID.
  * @apiParam {String} solutionId Solution External ID.
  * @apiParam {String} createdBy Keycloak user ID.
  * @apiParam {String} submissionNumber Submission Number.
  * @apiSampleRequest /assessment/api/v1/observationSubmissions/multiRate?entityId=1556397,1310274&solutionId=EF-DCPCR-2018-001&createdBy=e97b5582-471c-4649-8401-3cc4249359bb&submissionNumber=all
  * @apiUse successBody
  * @apiUse errorBody
  */

  async multiRate(req) {
    return new Promise(async (resolve, reject) => {

      try {

        req.body = req.body || {};
        let message = "Crtieria rating completed successfully"

        let programId = req.query.programId
        let solutionId = req.query.solutionId
        let entityId = req.query.entityId.split(",")

        if (!programId) {
          throw "Program Id is not found"
        }

        if (!solutionId) {
          throw "Solution Id is not found"
        }

        if (!req.query.entityId || !(req.query.entityId.length >= 1)) {
          throw "Entity Id is not found"
        }

        let solutionDocument = await database.models.solutions.findOne({
          externalId: solutionId,
        }, { themes: 1, levelToScoreMapping: 1, scoringSystem : 1, flattenedThemes : 1 }).lean()

        if (!solutionDocument) {
          return resolve({
            status: 400,
            message: "Solution does not exist"
          });
        }

        let queryObject = {
          "entityExternalId": { $in: entityId },
          "programExternalId": programId,
          "solutionExternalId": solutionId
        }

        let submissionDocuments = await database.models.submissions.find(
          queryObject,
          { answers: 1, criteria: 1, evidencesStatus: 1, entityProfile: 1, entityInformation: 1, "programExternalId": 1, entityExternalId: 1 }
        ).lean();

        if (!submissionDocuments) {
          throw "Couldn't find the submission document"
        }

        let commonSolutionDocumentParameters = {}

        if(solutionDocument.scoringSystem == "pointsBasedScoring") {

          commonSolutionDocumentParameters.scoringSystem = "pointsBasedScoring"

          let allCriteriaInSolution = new Array
          let allQuestionIdInSolution = new Array
          let solutionQuestions = new Array

          allCriteriaInSolution = gen.utils.getCriteriaIds(solutionDocument.themes);

          if(allCriteriaInSolution.length > 0) {
            
            commonSolutionDocumentParameters.themes = solutionDocument.flattenedThemes

            let allCriteriaDocument = await criteriaHelper.criteriaDocument({
              _id : {
                $in : allCriteriaInSolution
              }
            }, [
              "evidences"
            ])

            allQuestionIdInSolution = gen.utils.getAllQuestionId(allCriteriaDocument);
          }

          if(allQuestionIdInSolution.length > 0) {

            solutionQuestions = await questionsHelper.questionDocument({
              _id : {
                $in : allQuestionIdInSolution
              },
              responseType : {
                $in : [
                  "radio",
                  "multiselect",
                  "slider"
                ]
              }
            }, [
              "weightage",
              "options",
              "responseType"
            ])

          }

          if(solutionQuestions.length > 0) {
            commonSolutionDocumentParameters.questionDocuments = {}
            solutionQuestions.forEach(question => {
              commonSolutionDocumentParameters.questionDocuments[question._id.toString()] = {
                _id : question._id,
                weightage : question.weightage
              }
              if(question.options && question.options.length > 0) {
                question.options.forEach(option => {
                  (option.score && option.score > 0) ? commonSolutionDocumentParameters.questionDocuments[question._id.toString()][`${option.value}-score`] = option.score : ""
                })
              }
            })
          }

        }

        if(commonSolutionDocumentParameters && Object.keys(commonSolutionDocumentParameters).length > 0) {
          submissionDocuments.forEach(eachsubmissionDocument => {
            _.merge(eachsubmissionDocument,commonSolutionDocumentParameters)
          })
        }

        let resultingArray = await submissionsHelper.rateEntities(submissionDocuments, "multiRateApi")

        return resolve({ result: resultingArray })

      } catch (error) {
        return reject({
          status: 500,
          message: error,
          errorObject: error
        });
      }

    })
  }

};

