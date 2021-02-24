<template>
<v-card>
  <v-toolbar flat color="primary" dark>
    <v-toolbar-title class="font-21">Indexed DB</v-toolbar-title>
  </v-toolbar>
  <v-tabs vertical>
    <v-tab class="font-16" v-for="(section) in docs" v-bind:key="section.name">
      {{ section.name }}
    </v-tab>
    <v-tab-item v-for="(section, index) in docs" v-bind:key="index">
      <v-card flat>
        <v-card-text>
          <ol v-html="section.steps" class="font-16">
          </ol>
        </v-card-text>
      </v-card>
    </v-tab-item>

  </v-tabs>
</v-card>
</template>

<script>
export default {
  data() {
    return {
      docs: {
        open: {
          steps: `<li>Enter a value for Database Name and Store Name </li>
                  <li>Optional: Enter 2 for DBVersion. The higher number is for ease of testing when deleting the database</li>
                  <li>Click the “Open Database” button</li>
                  <li>To see this database, open the dev console with the f12 key</li>
                  <li>Go to the Storage Tab, it may be hidden inside the >> menu </li>
                  <li>Under Indexed BD > should be your database with the given store.</li>`,
          name: 'Open/Create Database Connection'
        },
        deleteStore: {
          steps: `<li>Enter a value for Delete Store Name</li>
                  <li>Click the "Delete Store" button</li>`,
          name: 'Delete a Store'
        },
        create: {
          steps: `<li>Enter a value for recordStore, the value given in the open connection step</li>
                  <li>Enter a value for the recordKey</li>
                  <li>Enter a value for the recordValue</li>
                  <li>Press the “Create Record” button</li>
                  <li>You can check the value either by using the dev tools or by following the Read Record step</li>`,
          name: 'Create a Record'
        },
        update: {
          steps: `<li>Enter a value for updateRecordStore, the value given in the open connection step</li>
                  <li>Enter a value for the updateRecordKey</li>
                  <li>Enter a value for the updateRecordValue</li>
                  <li>Press the “Update Record” button</li>
                  <li>You can check the value either by using the dev tools or by following the Read Record step</li>`,
          name: 'Update a Record'
        },
        delete: {
          steps: `<li>Enter a value for deleteRecordStore, the value given in the open connection step</li>
                  <li>Enter a value for the deleteRecordKey</li>
                  <li>Press the “Delete Record” button</li>
                  <li>You can check the value either by using the dev tools or by following the Read Record step, this should output undefined</li>`,
          name: 'Delete a Record'
        },
        read: {
          steps: `<li>Enter a value for readRecordStore, the value given in the open connection step</li>
                  <li>Enter a value for readRecordKey, the value given in the add record step</li>
                  <li>Press the “Read Record” button</li>
                  <li>The output should be given as a value</li>`,
          name: 'Read a Record'
        },
        deleteDB: {
          steps: `<li>This method required you to close the connection to the database, press the Close DB Button</li>
                  <li>OPTIONAL: try to open a connection with the database with a lower version number to see it fail due to having a lower version number than the current version */</li>
                  <li>Enter in the name of the database created in the Open Database step</li>
                  <li>Press the "Delete Database" button</li>
                  <li>To check this worked, check the storage tab in the dev tools or, one could try to open a connection with the version number of 1. If this works, the database was deleted. If not, it will throw an error showing that the database already exists and has a higher version number</li>`,
          name: 'Delete a Database'
        },
        close: {
          steps: '<li>Simply click the "Close DB Connection" button</li>',
          name: 'Close Database Connection'
        }
      }
    };
  }
};
</script>

<style lang="scss">
.docs__text {
  color: black;
}
</style>
