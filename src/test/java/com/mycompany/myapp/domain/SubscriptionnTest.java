package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SubscriptionnTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subscriptionn.class);
        Subscriptionn subscriptionn1 = new Subscriptionn();
        subscriptionn1.setId("id1");
        Subscriptionn subscriptionn2 = new Subscriptionn();
        subscriptionn2.setId(subscriptionn1.getId());
        assertThat(subscriptionn1).isEqualTo(subscriptionn2);
        subscriptionn2.setId("id2");
        assertThat(subscriptionn1).isNotEqualTo(subscriptionn2);
        subscriptionn1.setId(null);
        assertThat(subscriptionn1).isNotEqualTo(subscriptionn2);
    }
}
