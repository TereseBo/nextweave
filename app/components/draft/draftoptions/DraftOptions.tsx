
import './DraftOptions.scss'

export function DraftOptions() {

  return (
    <div id='draft-options'>
      <form className='transparent-form menu-row'>
        <div>
        <h3>Draft mode:</h3>
        </div>
        <div className=''>
          <input type="radio" id="text" name="draft-mode" value="text" checked />
          <label htmlFor="text">Text based</label>
        </div>
        <div>
          <input type="radio" id="click" name="draft-mode" value="click" checked />
          <label htmlFor="click">Point and click</label>
        </div>


      </form>
    </div>
  )
}