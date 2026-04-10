interface StudyData {
  reading: { today: number; total: number };
  writing: { today: number; total: number };
}

type StudyStats = {
  reading: {
    today: number;
    total: number;
  };
  writing: {
    today: number;
    total: number;
  };
};