export class AHP {
  private criteria: number[][];

  constructor(criteria: number[][]) {
    this.criteria = criteria;
  }

  private normalizeMatrix(matrix: number[][]): number[][] {
    const n = matrix.length;
    const normalizedMatrix: number[][] = [];

    const columnSum = matrix.reduce(
      (sum, row) => row.map((val, j) => sum[j] + val),
      Array(n).fill(0)
    );

    for (let i = 0; i < n; i++) {
      normalizedMatrix[i] = matrix[i].map((value, j) => value / columnSum[j]);
    }

    return normalizedMatrix;
  }

  private calculateWeights(matrix: number[][]): number[] {
    const n = matrix.length;
    const weights: number[] = [];

    for (let j = 0; j < n; j++) {
      const columnSum = matrix.reduce((sum, row) => sum + row[j], 0);
      weights[j] = columnSum / n;
    }

    return weights;
  }

  private calculateConsistencyIndex(matrix: number[][], weights: number[]): number {
    const n = matrix.length;
    let consistencyIndex = 0;

    for (let i = 0; i < n; i++) {
      consistencyIndex += matrix[i].reduce((sum, val, j) => sum + val * weights[j], 0) / weights[i];
    }

    const maxEigenvalue = this.calculateMaxEigenvalue(weights, matrix);
    return (maxEigenvalue - n) / (n - 1);
  }

  private calculateConsistencyRatio(consistencyIndex: number, randomIndex: number): number {
    return consistencyIndex / randomIndex;
  }

  private getRandomIndex(n: number): number {
    const randomIndexValues = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    return randomIndexValues[n - 1];
  }

  private calculateMaxEigenvalue(eigenValues: number[], matrix: number[][]): number {
    const n = matrix.length;
    let maxEigenvalue = 0;

    for (let j = 0; j < n; j++) {
      const columnSum = matrix.reduce((sum, row) => sum + row[j], 0);
      maxEigenvalue += columnSum * eigenValues[j];
    }

    return maxEigenvalue;
  }

  public calculateAHP() {
    const normalizedCriteria = this.normalizeMatrix(this.criteria);

    // console.log("Matriks Perbandingan Kriteria:");
    this.consoleLogMatrix(this.criteria);
    this.consoleLogTotal(this.criteria);

    // console.log("\nMatriks Normalisasi:");
    this.consoleLogMatrix(normalizedCriteria);
    this.consoleLogTotal(normalizedCriteria);

    const calculateTotal = this.calculateJumlah(normalizedCriteria);

    // console.log("\nJumlah (Sum):", calculateTotal);

    const eigenValues = this.calculateEigenValues(normalizedCriteria);
    const eigenSum = eigenValues.reduce((sum, value) => sum + value, 0);
    const prioritas = eigenValues.map((value) => value / eigenSum);

    // console.log("Prioritas (Weights):", prioritas);
    // console.log("Eigen Values:", eigenValues);

    const maxEigenvalue = this.calculateMaxEigenvalue(eigenValues, this.criteria);
    // console.log("\nMaximum Eigenvalue (λ Max):", maxEigenvalue);

    const consistencyIndex = this.calculateConsistencyIndex(this.criteria, prioritas);
    const randomIndex = this.getRandomIndex(this.criteria.length);
    const consistencyRatio = this.calculateConsistencyRatio(
      this.calculateConsistencyIndex(this.criteria, prioritas),
      this.getRandomIndex(this.criteria.length)
    );

    // console.log('\nConsistency Index:', consistencyIndex);
    // console.log("Random Index:", randomIndex);
    // console.log('Consistency Ratio:', consistencyRatio);

    return {
      matriks_perbandingan_berpasangan: this.criteria,
      matriks_normalisasi: normalizedCriteria,
      calculateTotal: calculateTotal,
      priority: prioritas,
      maxEigenvalue,
      consistencyIndex,
      randomIndex,
      consistencyRatio
    };
  }

  private calculateJumlah(matrix: number[][]): number[] {
    return matrix.map((row) => row.reduce((sum, value) => sum + value, 0));
  }

  private calculateEigenValues(matrix: number[][]): number[] {
    const n = matrix.length;
    const weights = this.calculateWeights(matrix);

    return matrix.map((row) => row.reduce((sum, value, j) => sum + value * weights[j], 0));
  }

  private consoleLogMatrix(matrix: number[][]): void {
    for (let i = 0; i < matrix.length; i++) {
      let rowString = '';
      for (let j = 0; j < matrix[i].length; j++) {
        rowString += matrix[i][j].toFixed(10) + '\t';
      }
      //   console.log(rowString);
    }
  }

  private consoleLogTotal(matrix: number[][]): void {
    const n = matrix.length;
    const totals: number[] = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        totals[j] += matrix[i][j];
      }
    }

    // console.log("Total\t", ...totals.map((total) => total.toFixed(10)));
  }
}

// Example usage:
// const criteriaMatrix = [
//   [1, 3, 5],
//   [1 / 3, 1, 3],
//   [1 / 5, 1 / 3, 1]
// ];

// const ahp = new AHP(criteriaMatrix);
// ahp.calculateAHP();
