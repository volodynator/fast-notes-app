import bayes from 'bayes';

const response = await fetch('classifier.json');
const classifierJson = await response.json();
export const revivedClassifier = bayes.fromJson(JSON.stringify(classifierJson));
