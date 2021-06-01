import paginateTpl from '../../template/paginate.hbs';

export default class NewPagination {
  constructor({ selector }) {
    this.refs = this.getRefs(selector);
    this.currentPage = 1;
    this.pageList = [];
    this.firstPage = 1;
    this.lastPage = 7;
    this.maxPage = 42;
  }

  getRefs(selector) {
    const refs = {};
    refs.paginateContainer = document.querySelector(selector);
    return refs;
  }

  updatepageList() {
    this.clearPaginationContainer();
    this.pageList = [];
    if (this.currentPage <= this.lastPage - 1) {
      for (let i = this.firstPage; i <= this.lastPage; i += 1) {
        this.pageList.push(i);
      }
      this.pageList.push('...');
      this.pageList.push(this.maxPage);
    } else if (this.currentPage == this.maxPage - 6 || this.currentPage == this.maxPage) {
      this.pageList.push(1);
      this.pageList.push('...');
      for (let i = this.maxPage - 6; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
    } else {
      this.pageList.push(1);
      this.pageList.push('...');
      for (let i = this.currentPage - 2; i <= +this.currentPage + 2; i += 1) {
        this.pageList.push(i);
      }
      this.pageList.push('...');
      this.pageList.push(this.maxPage);
    }
    this.appendPaginationMarkup();
  }

  appendPaginationMarkup() {
    this.refs.paginateContainer.insertAdjacentHTML('beforeend', paginateTpl(this.pageList));
  }

  clearPaginationContainer() {
    this.refs.paginateContainer.innerHTML = '';
  }
}
