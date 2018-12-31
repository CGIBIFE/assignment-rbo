import {parseCSV} from './parseCSV';

describe('Test csv string to json converter', () => {
  it('should should return json on passing csv string', function () {
    const result = parseCSV('First name,Sur name\n' +
      'Theo,Jansen\n' +
      'Fiona,de Vries\n');
    expect(result)
      .toEqual({
        head: ['First name', 'Sur name'],
        body: [{'First name': 'Theo', 'Sur name': 'Jansen'}, {'First name': 'Fiona', 'Sur name': 'de Vries'}]
      });
  });
});
