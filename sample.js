
jest.mock('shared-ui/src/lib/RiskAccordion', () => ({
  RiskAccordion: jest.fn(({ accData }) => (
    <div>
      {accData.map((item) => (
        <div key={item.accTitle} onClick={() => item.onTitleClick(item.accTitle)}>
          {item.accTitle}
        </div>
      ))}
    </div>
  )),
}));
