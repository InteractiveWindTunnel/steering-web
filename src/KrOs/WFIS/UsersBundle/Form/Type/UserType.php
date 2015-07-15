<?php
namespace KrOs\WFIS\UsersBundle\Form\Type;

use Symfony\Component\Form\FormBuilder;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class UserType extends AbstractType
{
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', 'text', array('label'=>'Nickname'))
            ->add('email', 'email', array('label'=>'Email'))
            ->add('plainPassword', 'repeated', array(
                'invalid_message' => 'Podane hasła nie są identyczne.',
                'type' => 'password',
                'first_name'=>'haslo',
                'second_name'=>'powtorz',
                'required'=>false
            ))
            ->add('enabled', 'checkbox', array('label'=>'Aktywny','required'=>false));
    }

    public function getName()
    {
        return 'user';
    }
    
    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'KrOs\WFIS\UsersBundle\Entity\User',
        );
    }
}
