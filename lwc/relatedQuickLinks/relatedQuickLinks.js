import { LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getFieldValue } from 'lightning/uiRecordApi';

  const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];
export default class RelatedQuickLinks extends LightningElement {
    error;
    records;
    totalRecords;
    data = [];
  @wire(getRelatedListRecords, {
    parentRecordId: '0012w00000beODyAAM',
    relatedListId: 'Contacts',
    fields: ['Contact.Id', 'Contact.Name'],
  })
  listInfo({ error, data }) {
      if (data) {
          console.log(data.records);
        this.records = data.records;
        this.error = undefined;
        this.totalRecords = this.records.length;
    } else if (error) {
      this.error = error;
      this.records = undefined;
    }
  }
    get relatedRecords() {
        return getFieldValue(this.records, 'Contacts');
    }
    get formattedData() {
        return this.relatedRecords
            ? this.relatedRecords.map(record => ({
                  Id: record.Id,
                  Name: record.Name,
                  // Add other fields as needed
              }))
            : [{'Name': 'Rohit'}];
    }

  

    handleLinkHover(event) {
        console.log('hovering');
        //const recordId = event.currentTarget.dataset.recordId;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}