<template>
  <div>
    <div class="pd15">修改{{edit.label}}</div>
    <CellGroup>
      <RadioGroup
        v-if="edit.field==='sex'"
        v-model="edit.value">
        <CellGroup>
          <Cell title="男" clickable @click="edit.value = 1">
            <Radio :name="1"/>
          </Cell>
          <Cell title="女" clickable @click="edit.value = 0">
            <Radio :name="0"/>
          </Cell>
        </CellGroup>
      </RadioGroup>
      <div v-else-if="edit.field==='birth'">
        <Cell :title="edit.value||'请选择日期'" clickable @click="selectDate" is-link/>
        <Popup v-model="pickShow" position="bottom" :overlay="true">
          <DatetimePicker
            v-model="birthDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="pickShow=false"
            @cancel="pickShow=false"
          />
        </Popup>
      </div>
      <Field
        v-else-if="edit.field==='signature'"
        type="textarea"
        v-model="edit.value"
        autosize
        :placeholder="edit.placeholder"
        icon="clear"
        @click-icon="clear"/>
      <Field
        v-else
        v-model="edit.value"
        :placeholder="edit.placeholder"
        icon="clear"
        @click-icon="clear"/>
    </CellGroup>
    <div class="buttons">
      <Button class="mt15" slot="button" size="normal" :block="true" type="primary" @click="save">保存</Button>
      <Button class="mt15" slot="button" size="normal" :block="true" type="default" @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {CellGroup, Cell, Field, RadioGroup, Radio, DatetimePicker, Button, Toast, Popup} from 'vant'
  import {date, validate} from '@/common/util';

  export default {
    name: 'Edit',
    components: {CellGroup, Cell, Field, RadioGroup, Radio, DatetimePicker, Button, Toast, Popup},
    created() {
      let field = this.$route.query.type;
      let fn = () => {
        if (this.userInfo.userId) {
          console.log('field', field);
          let label;
          if (field === 'nickName') {
            label = '昵称'
          } else if (field === 'signature') {
            label = '签名'
          } else if (field === 'phone') {
            label = '手机号'
          } else if (field === 'email') {
            label = '邮箱'
          } else if (field === 'sex') {
            label = '性别'
          } else if (field === 'birth') {
            label = '生日'
          }
          this.$store.dispatch('setEditField', {
            label: label,
            field: field,
            value: this.userInfo[field],
            placeholder: `请输入${label}`
          })
        } else {
          setTimeout(() => {
            fn();
          }, 100)
        }
      };
      fn()
    },
    computed: {
      ...mapState(['userInfo', 'edit'])
    },
    data() {
      return {
        pickShow: false,
        birthDate: null,
        minDate: new Date('1900-01-01'),
        maxDate: new Date()
      }
    },
    watch: {
      birthDate() {
        this.edit.value = date.formatDate(this.birthDate)
      }
    },
    methods: {
      clear() {
        this.$store.dispatch('clearEditValue')
      },
      selectDate() {
        this.pickShow = true;
        this.birthDate = this.edit.value ? new Date(this.edit.value) : new Date('1990-01-01');
      },
      save() {
        Toast.loading();
        let _field = this.edit.field;
        let _value = this.edit.value.trim();
        if (_field === 'phone') {
          if (_value.length === 0) {
            Toast('请输入手机号');
            return;
          }
          if (!validate.isPhone(_value)) {
            Toast('请输入正确的手机号');
            return;
          }
        }
        if (_field === 'email') {
          if (!validate.isEmail(_field)) {
            Toast('请输入正确的邮箱');
            return;
          }
        }
        this.$request({
          api: 'modifyUserInfo',
          params: {
            field: _field,
            value: _value
          }
        }, () => {
          Toast.success('修改成功');
          this.$store.dispatch('saveUserInfo', {
            field: _field,
            value: _value
          });
          this.$router.go(-1);
        }, err => {
          Toast(err.message)
        });
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .buttons {
    padding: 15px;
  }
</style>
