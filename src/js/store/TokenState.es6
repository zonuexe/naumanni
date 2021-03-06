import * as actions from 'src/actions'


export default class TokenState {
  /**
   * @param {OAuthToken[]} tokens
   */
  constructor(tokens=[]) {
    this._tokens = tokens
    this._tokens.sort((a, b) => {
      if(a.acct > b.acct)
        return 1
      else if(a.acct < b.acct)
        return -1
      return 0
    })
  }

  reduce(payload) {
    switch(payload.type) {
    case actions.TOKEN_LOADED:
      return this.onTokenLoaded(payload)
    case actions.TOKEN_ADDED:
      return this.onTokenAdded(payload)
    default:
      return this
    }
  }

  onTokenLoaded({tokens}) {
    return new TokenState(tokens)
  }

  onTokenAdded({token}) {
    return new TokenState([...this._tokens, token])
  }

  getTokenByAcct(acct) {
    return this.tokens.find((token) => token.acct === acct)
  }

  /**
   * 生きている、読み込みが完了しているTokenのみリストする
   */
  get tokens() {
    return this._tokens.filter((token) => token.isAlive())
  }

  /**
   * 全てのTokenを返す。
   */
  get allTokens() {
    return this._tokens
  }
}
