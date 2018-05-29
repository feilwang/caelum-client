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
  import {CellGroup, Cell, Field, RadioGroup, Radio, Button, Toast} from 'vant'

  export default {
    name: 'Edit',
    components: {
      CellGroup,
      Cell,
      Field,
      Button,
      RadioGroup,
      Radio
    },
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
    computed: mapState(['userInfo', 'edit']),
    methods: {
      clear() {
        this.$store.dispatch('clearEditValue')
      },
      save() {
        Toast.loading();
        this.$request({
          api: 'modifyUserInfo',
          params: {
            field: this.edit.field,
            value: this.edit.value
          }
        }, () => {
          Toast.success('修改成功');
          this.$store.dispatch('saveUserInfo', {
            field: this.edit.field,
            value: this.edit.value
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
