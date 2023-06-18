const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/errors/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const user_id = req.user.id;
  const information = req.body;
  const answer = await Answer.create({
    ...information,
    question: question_id,
    user: user_id,
  });
  return res.status(200).json({
    success: true,
    data: answer,
  });
});
const getAllAnswersByQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const question = await Question.findById(question_id).populate("answers"); //*Populate answer referanslı id nin bilgilerini getirir
  const answers = question.answers;
  return res.status(200).json({
    success: true,
    count: answers.length,
    data: answers,
  });
});
const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id)
    .populate({
      path: "user",
      select: "name role email profile_image",
    })
    .populate({
      path: "question",
      select: "title content",
    });

  return res.status(200).json({
    sucess: true,
    data: answer,
  });
});
const editAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const { content } = req.body;
  const answer = await Answer.findById(answer_id);
  answer.content = content;
  await answer.save();

  return res.status(200).json({
    success: true,
    data: answer,
  });
});
const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const { question_id } = req.params;
  await Answer.findByIdAndDelete(answer_id);
  const question = await Question.findById(question_id);
  question.answers.splice(question.answers.indexOf(answer_id), 1);
  question.answerCount = question.answers.length;

  await question.save();

  return res.status(200).json({
    success: true,
    message: "Answer Deleted Successfully",
  });
});

const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id);
  if (answer.likes.includes(req.user.id)) {
    return next(new CustomError("You are already liked that answer"), 400);
  }
  answer.likes.push(req.user.id);
  await answer.save();
  return res.status(200).json({
    success: true,
    data: answer,
  });
});
const undolikeAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id);
  if (!answer.likes.includes(req.user.id)) {
    return next(
      new CustomError("You cannot undo like operation for that answer"),
      400
    );
  }
  const index = answer.likes.indexOf(req.user.id);
  answer.likes.splice(index, 1);
  await answer.save();

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

module.exports = {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undolikeAnswer,
};
