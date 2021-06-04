<template>
  <v-card flat tile class="pa-4 mx-auto" width="800">
    <v-sheet outlined rounded class="overflow-hidden">
      <v-card-title class="pa-2">
        <v-spacer/>
        <v-btn icon @click="shrink()">
          <v-icon>mdi-code-tags</v-icon>
        </v-btn>
      </v-card-title>
      <v-expansion-panels :value="panels" accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-content eager>
            <v-divider/>
            <v-item-group mandatory v-model="language" class="px-2 pt-2">
              <v-item
                  v-for="item in languageOption"
                  :key="item.label"
                  v-slot="{ active, toggle }">
                <v-btn
                    @click="toggle"
                    depressed
                    :input-value="active"
                    class="mr-2 mb-2"
                    small>
                  {{item.label}}
                </v-btn>
              </v-item>
            </v-item-group>
            <v-divider/>
            <v-window v-model="language">
              <v-window-item v-for="item in languageOption" :key="item.label">
                <v-card flat tile>
                  <div
                      class="py-2 px-4 code-content"
                      :id="item.label">
                    <v-btn
                        icon
                        :id="`button_${item.label}`"
                        @click="copy(item.label)"
                        class="copy-button"
                        small>
                      <v-icon small>mdi-content-copy</v-icon>
                    </v-btn>
                    <highlightjs class="hl-code" :language='item.label' :code="item.code" />
                  </div>
                </v-card>
              </v-window-item>
            </v-window>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Demo',
  data: () => ({
    panels: 0,
    language: null,
    languageOption: [
      {
        label: 'java',
        code: 'package com.joe2shi.siamese.auth.service.impl;\n' +
            '\n' +
            'import com.joe2shi.siamese.auth.dto.AccreditDto;\n' +
            'import com.joe2shi.siamese.auth.config.JwtProperties;\n' +
            'import com.joe2shi.siamese.auth.service.AuthService;\n' +
            'import com.joe2shi.siamese.auth.proxy.UserServiceProxy;\n' +
            'import com.joe2shi.siamese.common.constant.SystemConstant;\n' +
            'import com.joe2shi.siamese.common.enums.ResponseEnum;\n' +
            'import com.joe2shi.siamese.common.exception.SiameseException;\n' +
            'import com.joe2shi.siamese.common.utils.JwtUtils;\n' +
            'import com.joe2shi.siamese.common.utils.UserInfo;\n' +
            'import com.joe2shi.siamese.common.vo.SiameseResult;\n' +
            'import lombok.extern.slf4j.Slf4j;\n' +
            'import org.apache.commons.lang3.StringUtils;\n' +
            'import org.springframework.boot.context.properties.EnableConfigurationProperties;\n' +
            'import org.springframework.data.redis.core.RedisTemplate;\n' +
            'import org.springframework.stereotype.Service;\n' +
            '\n' +
            'import javax.annotation.Resource;\n' +
            'import java.util.concurrent.TimeUnit;\n' +
            '\n' +
            '@Service\n' +
            '@EnableConfigurationProperties(JwtProperties.class)\n' +
            '@Slf4j\n' +
            '@SuppressWarnings("rawtypes")\n' +
            'public class AuthServiceImpl implements AuthService {\n' +
            '    @Resource\n' +
            '    private JwtProperties jwtProperties;\n' +
            '    @Resource\n' +
            '    private UserServiceProxy userServiceProxy;\n' +
            '    @Resource\n' +
            '    private RedisTemplate<String, String> redisTemplate;\n' +
            '\n' +
            '    @Override\n' +
            '    public SiameseResult accredit(AccreditDto accredit) {\n' +
            '        try {\n' +
            '            // Auth user\n' +
            '            SiameseResult result = userServiceProxy.accredit(accredit);\n' +
            '            if (result.getCode() != SystemConstant.SUCCESS_CODE) {\n' +
            '                return result;\n' +
            '            }\n' +
            '            // Extend the token time if you have already sign in\n' +
            '            UserInfo userInfo = new UserInfo((String) result.getData(), System.currentTimeMillis());\n' +
            '            String redisToken = redisTemplate.boundValueOps(userInfo.getId()).get();\n' +
            '            if (!StringUtils.isBlank(redisToken)) {\n' +
            '                redisTemplate.expire(userInfo.getId(), SystemConstant.NUMBER_THIRTY, TimeUnit.MINUTES);\n' +
            '                return new SiameseResult<>(ResponseEnum.SIGN_IN_SUCCESS, redisToken);\n' +
            '            } else {\n' +
            '                // Generate token\n' +
            '                String token = JwtUtils.generateToken(userInfo, jwtProperties.getPrivateKey());\n' +
            '                // Save in redis, duration is 30 minutes\n' +
            '                redisTemplate.boundValueOps(userInfo.getId()).set(token, SystemConstant.NUMBER_THIRTY, TimeUnit.MINUTES);\n' +
            '                return new SiameseResult<>(ResponseEnum.SIGN_IN_SUCCESS, token);\n' +
            '            }\n' +
            '        } catch (Exception e) {\n' +
            '            log.error(ResponseEnum.GENERATE_TOKEN_FAILED.getMessage() + SystemConstant.CHARACTER_COLON + SystemConstant.CHARACTER_SPACE + e.getMessage());\n' +
            '            throw new SiameseException(ResponseEnum.GENERATE_TOKEN_FAILED);\n' +
            '        }\n' +
            '    }\n' +
            '}\n'
      }
    ]
  }),
  methods: {
    ...mapActions(['showSnackbar']),
    shrink () {
      this.panels = this.panels === 0 ? -1 : 0
      if (this.panels === -1) {
        window.getSelection().removeAllRanges()
      }
    },
    copy (id) {
      if (document.selection) {
        const range = document.body.createTextRange()
        range.moveToElementText(document.getElementById(id))
        range.select()
      } else if (window.getSelection) {
        const range = document.createRange()
        range.selectNode(document.getElementById(id))
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
      }
      document.execCommand('copy')
      this.showSnackbar({ message: this.$t('Page.Demo.CopySuccess'), color: 'success' })
    }
  },
  watch: {
    'language' () {
      window.getSelection().removeAllRanges()
    }
  }
}
</script>
