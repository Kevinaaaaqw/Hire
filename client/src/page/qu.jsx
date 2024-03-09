import React, { useState } from 'react';
import './qucss/returnqu.css';

function Qu() {
  const [questionOne, setQuestionOne] = useState('');
  const [questionTwo, setQuestionTwo] = useState('');

  const handleQuestionOneChange = (event) => {
    setQuestionOne(event.target.value);
  };

  const handleQuestionTwoChange = (event) => {
    setQuestionTwo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 处理表单提交逻辑
  };

  return (
    <div className="container">
      <h1>問題回報</h1>
      <hr />
      <h3>注意事項</h3>
      <p>回報問題前請您注意以下事項：</p>
        <ol>
            <li>
                提供清晰詳細的描述：請在回報問題時提供盡可能清晰和詳細的描述。這將有助於我們更好地了解您的問題並提供準確的幫助。請提供相關的訂單號碼、產品名稱和具體問題的描述。
            </li>
            <li>
                附上相關資料和圖片：如果您遇到產品損壞或其他問題，請盡量提供相關的資料和圖片作為證據。這將有助於我們更好地理解問題的性質，並能夠更快速地為您解決問題。
            </li>
            <li>
                檢查常見問題解答：在回報問題之前，建議您先查看我們的常見問題解答頁面。您可能會在那裡找到對您問題的解答或解決方法，從而節省您的時間和努力。
            </li>
            <li>
                合理的期望與解決時間：請理解，每個問題都有其處理時間。我們將盡力在合理的時間內為您解決問題，但有時可能需要進一步的調查和處理。我們感謝您的耐心和理解。
            </li>
        </ol>
        <p>謝謝您遵守以上的注意事項。現在您可以填寫下面的問題回報表單，我們將盡快處理您的問題。如有任何疑問，請隨時聯繫我們的客戶服務團隊。</p>
        <hr></hr>
      <form onSubmit={handleSubmit}>
        <h3>請問您的問題類別屬於?</h3>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="quone"
            id="rent"
            value="出租問題"
            onChange={handleQuestionOneChange}
            checked={questionOne === '出租問題'}
          />
          <label className="form-check-label" htmlFor="rent">
            出租問題
          </label>
        </div>
        <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="quone" id="borrow"
                    value="option2"></input>
                <label class="form-check-label" for="borrow">借物問題</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="quone" id="other"
                    value="option3"></input>
                <label class="form-check-label" for="other">其他</label>
            </div>
        <h3>問題具體項目是什麼?</h3>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="qutwo"
            id="contract"
            value="租賃合約問題"
            onChange={handleQuestionTwoChange}
            checked={questionTwo === '租賃合約問題'}
          />
          <label className="form-check-label" htmlFor="contract">
            租賃合約問題
          </label>
        </div>
        <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="qutwo" id="lease"
                    value="option2"></input>
                <label class="form-check-label" for="lease">租賃相關回報</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="qutwo" id="system"
                    value="option3"></input>
                <label class="form-check-label" for="system">系統相關問題</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="qutwo" id="bug"
                    value="option4"></input>
                <label class="form-check-label" for="bug">回報BUG</label>
            </div>
        <div className="nextbtn">
          <button type="submit" className="btn btn-primary">
            下一步
          </button>
        </div>
      </form>
    </div>
  );
}

export default Qu;