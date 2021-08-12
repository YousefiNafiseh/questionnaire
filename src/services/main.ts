async function get(url: string){
  const result = await fetch(url);
  return result.json();
}

export async function loadQuestionnaires(){
  return get('http://localhost:3000/mockData/Questionnaire.json');
}